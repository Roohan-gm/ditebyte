import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import DefaultProfile from '../../assets/images/defaults/DefaultProfile';
import { UserContext } from '../../context/UserContext';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function HomeHeader() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch the image URL from Convex using the storage ID
  const getImageUrl = useQuery(api.Storage.getFileUrl, { storageId: user?.picture });

  useEffect(() => {
    if (user?.picture) {
      setImageUrl(getImageUrl);
    } else {
      setImageUrl(null);
    }
  }, [user?.picture, getImageUrl]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
        {imageUrl ? (
          <>
            {loading && (
              <ActivityIndicator
                size="small"
                color="#28efa8"
                style={{ position: 'absolute', zIndex: 1 }}
              />
            )}
            <Image
              source={{ uri: imageUrl }}
              style={{ width: '100%', height: '100%' }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => setError(true)}
            />
            {error && <DefaultProfile />}
          </>
        ) : (
          <DefaultProfile />
        )}
      </View>
      <View>
        <Text style={{ fontSize: 16 }}>Hello, 👋</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{user?.name}</Text>
      </View>
    </View>
  );
}