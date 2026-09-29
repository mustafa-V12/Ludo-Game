import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

import { buttonStyles } from '@/styles/button.styles';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  /** 'primary' är den gula huvudknappen, 'secondary' den ljusa. */
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** En knapp som används på alla skärmar, så att de ser likadana ut. */
export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        buttonStyles.base,
        variant === 'primary' ? buttonStyles.primary : buttonStyles.secondary,
        pressed ? buttonStyles.pressed : null,
        disabled ? buttonStyles.disabled : null,
        style,
      ]}
    >
      <Text
        style={[
          buttonStyles.label,
          variant === 'primary' ? buttonStyles.primaryLabel : buttonStyles.secondaryLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
