import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import Axios from 'axios';
import { UserPicture } from '../resources/User.resource';

interface UserAvatarProps {
    picture: UserPicture | null;
    size?: 'small' | 'medium' | 'large' | number;
    rounded?: boolean;
    containerStyle?: object;
    onPress?: () => void;
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
            Axios.get<ArrayBuffer>(relativeUrl, { responseType: 'arraybuffer' })
                .then(response => {
                    const bytes = new Uint8Array(response.data);
                    const chunks: string[] = [];
                    bytes.forEach(b => chunks.push(String.fromCharCode(b)));
                    setDataUri(`data:image/${picture.type};base64,${btoa(chunks.join(''))}`);
                })
                .catch(() => {});
        }

        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = '';
            }
        };
    }, [picture?.url]);

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
