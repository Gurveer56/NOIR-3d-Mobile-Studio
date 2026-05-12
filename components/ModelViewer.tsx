import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Asset } from 'expo-asset';
import * as THREE from 'three';
import { Colors, Typography, BorderRadius, Spacing } from '../constants/theme';

type SpeedOption = 1 | 2 | 2.5;

interface ModelProps {
  uri: string;
  autoRotateSpeed: number;
  interactive?: boolean;
}

function ShirtModel({ uri, autoRotateSpeed, interactive = false }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(uri);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current && !interactive) {
      groupRef.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      clonedScene.position.sub(center);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const scale = 2 / maxDim;
        clonedScene.scale.setScalar(scale);
      }
    }
  }, [clonedScene]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

function ModelFallback() {
  return null;
}

interface ModelViewerProps {
  modelAsset: number;
  showSpeedControls?: boolean;
  interactive?: boolean;
  style?: any;
}

export default function ModelViewer({
  modelAsset,
  showSpeedControls = false,
  interactive = false,
  style,
}: ModelViewerProps) {
  const [speed, setSpeed] = useState<SpeedOption>(1);
  const [uri, setUri] = useState<string | null>(null);
  const speeds: SpeedOption[] = [1, 2, 2.5];
  const autoRotateSpeed = speed * 0.5;

  useEffect(() => {
    let cancelled = false;
    async function loadAsset() {
      try {
        const asset = Asset.fromModule(modelAsset);
        await asset.downloadAsync();
        if (!cancelled) {
          setUri(asset.localUri || asset.uri);
        }
      } catch (e) {
        console.warn('Failed to load 3D model:', e);
      }
    }
    loadAsset();
    return () => { cancelled = true; };
  }, [modelAsset]);

  if (!uri) {
    return (
      <View style={[styles.container, styles.loadingContainer, style]}>
        <ActivityIndicator color={Colors.gray500} size="small" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Canvas
        style={styles.canvas}
        camera={{ position: [0, 0, 4], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={Platform.OS === 'web' ? Math.min(window.devicePixelRatio, 2) : 1}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.3} />
        <Suspense fallback={<ModelFallback />}>
          <ShirtModel
            uri={uri}
            autoRotateSpeed={autoRotateSpeed}
            interactive={interactive}
          />
        </Suspense>
        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            rotateSpeed={0.8}
            zoomSpeed={0.8}
          />
        )}
      </Canvas>

      {showSpeedControls && (
        <View style={styles.speedControls}>
          {speeds.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.speedButton, speed === s && styles.speedButtonActive]}
              onPress={() => setSpeed(s)}
              activeOpacity={0.7}
            >
              <Text style={[styles.speedText, speed === s && styles.speedTextActive]}>
                {s}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.gray900,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    flex: 1,
  },
  speedControls: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.xs,
    backgroundColor: Colors.overlay,
    borderRadius: BorderRadius.full,
    padding: Spacing.xs,
  },
  speedButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  speedButtonActive: {
    backgroundColor: Colors.white,
  },
  speedText: {
    ...Typography.label,
    color: Colors.gray300,
    fontFamily: 'Inter-Medium',
  },
  speedTextActive: {
    color: Colors.black,
  },
});
