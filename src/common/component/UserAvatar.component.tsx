import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import Axios from 'axios';
import { Directory, File, Paths } from 'expo-file-system';
import { UserPicture } from '../resources/User.resource';

interface UserAvatarProps {
    picture: UserPicture | null;
    size?: 'small' | 'medium' | 'large' | number;
    rounded?: boolean;
    containerStyle?: object;
    onPress?: () => void;
}

// Persisted to the document directory (not the cache dir) so downloaded avatars
// survive app restarts instead of being wiped by OS cache eviction.
// Lazily constructed: expo-file-system isn't supported on web, and merely
// instantiating a Directory there throws, so this must never run at import time.
let avatarsDirectory: Directory | undefined;

function getCachedAvatarFile(picture: UserPicture): File {
    if (!avatarsDirectory) {
        avatarsDirectory = new Directory(Paths.document, 'avatars');
    }
    if (!avatarsDirectory.exists) {
        avatarsDirectory.create({ idempotent: true, intermediates: true });
    }
    return new File(avatarsDirectory, `${picture.id}.${picture.type}`);
}

// On web (dev in a browser included), Expo's file system isn't backed by real
// persistent storage, so we use the standard Cache Storage API instead, keyed
// the same way as the native disk cache so a new picture id busts old entries.
const WEB_AVATAR_CACHE_NAME = 'avatars';

function getWebAvatarCacheKey(picture: UserPicture): string {
    return `https://avatar-cache.local/${picture.id}.${picture.type}`;
}

async function getWebAvatarBlob(picture: UserPicture, relativeUrl: string): Promise<Blob> {
    const hasCacheStorage = typeof caches !== 'undefined';
    const cacheKey = getWebAvatarCacheKey(picture);
    const cache = hasCacheStorage ? await caches.open(WEB_AVATAR_CACHE_NAME) : null;
    const match = await cache?.match(cacheKey);
    if (match) return match.blob();

    const response = await Axios.get(relativeUrl, { responseType: 'blob' });
    const blob = response.data as Blob;
    await cache?.put(cacheKey, new Response(blob));
    return blob;
}

export function UserAvatar({ picture, size = 'medium', rounded = true, containerStyle, onPress }: UserAvatarProps) {
    const [dataUri, setDataUri] = useState<string>('');
    const objectUrlRef = useRef<string>('');

    useEffect(() => {
        if (!picture?.url) return;

        const relativeUrl = picture.url.replace(/^\//, '');

        if (Platform.OS === 'web') {
            getWebAvatarBlob(picture, relativeUrl)
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    objectUrlRef.current = url;
                    setDataUri(url);
                })
                .catch(() => {});
        } else {
            const file = getCachedAvatarFile(picture);

            if (file.exists) {
                setDataUri(file.uri);
            } else {
                Axios.get<ArrayBuffer>(relativeUrl, { responseType: 'arraybuffer' })
                    .then(response => {
                        if (!file.exists) file.create({ intermediates: true });
                        file.write(new Uint8Array(response.data));
                        setDataUri(file.uri);
                    })
                    .catch(() => {});
            }
        }

        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = '';
            }
        };
    }, [picture?.id, picture?.url]);

    return (
        <Avatar
            rounded={rounded}
            size={size}
            source={dataUri ? { uri: dataUri } : undefined}
            containerStyle={containerStyle}
            onPress={onPress}
        />
    );
}
