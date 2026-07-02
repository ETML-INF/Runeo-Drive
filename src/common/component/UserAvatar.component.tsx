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
const avatarsDirectory = new Directory(Paths.document, 'avatars');

function getCachedAvatarFile(picture: UserPicture): File {
    if (!avatarsDirectory.exists) {
        avatarsDirectory.create({ idempotent: true, intermediates: true });
    }
    return new File(avatarsDirectory, `${picture.id}.${picture.type}`);
}

export function UserAvatar({ picture, size = 'medium', rounded = true, containerStyle, onPress }: UserAvatarProps) {
    const [dataUri, setDataUri] = useState<string>('');
    const objectUrlRef = useRef<string>('');

    useEffect(() => {
        if (!picture?.url) return;

        const relativeUrl = picture.url.replace(/^\//, '');

        if (Platform.OS === 'web') {
            Axios.get(relativeUrl, { responseType: 'blob' })
                .then(response => {
                    const url = URL.createObjectURL(response.data as Blob);
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
