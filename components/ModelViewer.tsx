import React, {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import { OrbitControls, useGLTF } from '@react-three/drei/native';
import * as THREE from 'three';
import { ThemePalette, Typography, Spacing } from '../constants/theme';
import { useAppTheme } from '../hooks/useAppTheme';

interface GLBModelProps {
  modelAsset: number;
  interactive: boolean;
  autoRotate: boolean;
}

interface CameraRigProps {
  distance: number;
}

interface LightRigProps {
  interactive: boolean;
}

interface SceneProps {
  modelAsset: number;
  interactive: boolean;
  autoRotate: boolean;
  zoomDistance: number;
  resetSignal: number;
  colors: ThemePalette;
}

export interface ModelViewerHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
}

interface ModelViewerProps {
  modelAsset: number;
  interactive?: boolean;
  autoRotate?: boolean;
  style?: StyleProp<ViewStyle>;
}

const MIN_DISTANCE = 2.2;
const MAX_DISTANCE = 6.2;
const DEFAULT_DISTANCE = 4;
const ZOOM_STEP = 0.35;

function GLBModel({ modelAsset, interactive, autoRotate }: GLBModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelAsset as never) as { scene: THREE.Group };

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    cloned.position.set(0, 0, 0);
    cloned.scale.set(1, 1, 1);
    cloned.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = maxDimension > 0 ? 2 / maxDimension : 1;

    cloned.scale.setScalar(scale);
    cloned.updateMatrixWorld(true);

    const centeredBox = new THREE.Box3().setFromObject(cloned);
    const center = centeredBox.getCenter(new THREE.Vector3());
    cloned.position.sub(center);

    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current && !interactive && autoRotate) {
      groupRef.current.rotation.y += delta * 0.42;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

function CameraRig({ distance }: CameraRigProps) {
  const { camera } = useThree();

  useFrame(() => {
    const currentDistance = camera.position.length();
    const nextDistance = THREE.MathUtils.lerp(currentDistance || DEFAULT_DISTANCE, distance, 0.18);

    if (camera.position.lengthSq() === 0) {
      camera.position.set(0, 0.15, nextDistance);
    } else {
      camera.position.setLength(nextDistance);
    }

    camera.updateProjectionMatrix();
  });

  return null;
}

function FrontLight({ interactive }: LightRigProps) {
  const { camera } = useThree();
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame(() => {
    if (!lightRef.current) {
      return;
    }

    const direction = camera.position.clone().normalize();
    const depth = interactive ? 6.5 : 5.5;

    lightRef.current.position.set(
      direction.x * depth,
      direction.y * depth + 0.5,
      direction.z * depth + 1.2
    );
    targetRef.current.position.set(0, 0, 0);
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <primitive object={targetRef.current} />
      <directionalLight ref={lightRef} intensity={2.6} />
    </>
  );
}

function Scene({ modelAsset, interactive, autoRotate, zoomDistance, resetSignal, colors }: SceneProps) {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!interactive || !controlsRef.current) {
      return;
    }

    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.reset();
    controlsRef.current.update();
  }, [interactive, resetSignal]);

  return (
    <>
      <color attach="background" args={[colors.gray900]} />
      <ambientLight intensity={1.1} />
      <hemisphereLight args={[colors.white, colors.gray700, 1.35]} />
      <FrontLight interactive={interactive} />
      <pointLight position={[0, -2.2, 2.4]} intensity={0.45} />
      <CameraRig distance={zoomDistance} />
      <GLBModel modelAsset={modelAsset} interactive={interactive} autoRotate={autoRotate} />
      {interactive ? (
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          rotateSpeed={0.9}
          minDistance={MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
          minPolarAngle={Math.PI / 2.9}
          maxPolarAngle={Math.PI / 1.65}
        />
      ) : null}
    </>
  );
}

function Loader({ colors }: { colors: ThemePalette }) {
  return (
    <View style={[styles.centered, { backgroundColor: colors.gray900 }]}>
      <ActivityIndicator color={colors.accent} size="large" />
      <Text style={[styles.loadingText, { color: colors.gray300 }]}>Loading model</Text>
    </View>
  );
}

const ModelViewer = forwardRef<ModelViewerHandle, ModelViewerProps>(
  ({ modelAsset, interactive = true, autoRotate = false, style }, ref) => {
    const { colors } = useAppTheme();
    const [zoomDistance, setZoomDistance] = useState(DEFAULT_DISTANCE);
    const [resetSignal, setResetSignal] = useState(0);

    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        setZoomDistance((value) => Math.max(MIN_DISTANCE, value - ZOOM_STEP));
      },
      zoomOut: () => {
        setZoomDistance((value) => Math.min(MAX_DISTANCE, value + ZOOM_STEP));
      },
      resetView: () => {
        setZoomDistance(DEFAULT_DISTANCE);
        setResetSignal((value) => value + 1);
      },
    }));

    return (
      <View style={[styles.container, { backgroundColor: colors.gray900 }, style]}>
        <Suspense fallback={<Loader colors={colors} />}>
          <Canvas style={styles.canvas} camera={{ position: [0, 0.15, DEFAULT_DISTANCE], fov: 32 }}>
            <Scene
              modelAsset={modelAsset}
              interactive={interactive}
              autoRotate={autoRotate}
              zoomDistance={zoomDistance}
              resetSignal={resetSignal}
              colors={colors}
            />
          </Canvas>
        </Suspense>
      </View>
    );
  }
);

ModelViewer.displayName = 'ModelViewer';

export default ModelViewer;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#0D1016',
  },
  centered: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D1016',
    zIndex: 10,
  },
  canvas: {
    flex: 1,
  },
  loadingText: {
    ...Typography.caption,
    color: '#B4BBC8',
    fontFamily: 'Inter-Medium',
    marginTop: Spacing.sm,
  },
});
