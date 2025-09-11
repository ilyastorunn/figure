import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [darkMode, setDarkMode] = React.useState(colorScheme === 'dark');

  // Mock user data - will be replaced with real data later
  const userData = {
    name: 'Creative User',
    email: 'user@example.com',
    isPremium: false,
    monthlyUsage: 2,
    monthlyLimit: 3,
    joinDate: 'November 2024',
  };

  const handleUpgradeToPremium = () => {
    // TODO: Navigate to paywall
    console.log('Navigate to paywall');
  };

  const handleSettings = () => {
    // TODO: Navigate to settings
    console.log('Navigate to settings');
  };

  return (
    <GradientBackground variant="accent">
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.surface }]}>
                {userData.name.charAt(0)}
              </Text>
            </View>
            <Text style={[styles.userName, { color: colors.text }]}>
              {userData.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {userData.email}
            </Text>
          </View>

          {/* Usage Stats */}
          <GlassCard variant="elevated" style={styles.usageCard}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Monthly Usage
            </Text>
            
            <View style={styles.usageStats}>
              <View style={styles.usageProgress}>
                <View style={styles.progressBackground}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        backgroundColor: colors.primary,
                        width: `${(userData.monthlyUsage / userData.monthlyLimit) * 100}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.usageText, { color: colors.textSecondary }]}>
                  {userData.monthlyUsage} of {userData.monthlyLimit} transformations used
                </Text>
              </View>
              
              {!userData.isPremium && userData.monthlyUsage >= userData.monthlyLimit && (
                <View style={[styles.limitReached, { backgroundColor: colors.error + '20' }]}>
                  <Text style={[styles.limitText, { color: colors.error }]}>
                    ⚠️ Monthly limit reached
                  </Text>
                </View>
              )}
            </View>

            {!userData.isPremium && (
              <GlassButton
                title="Upgrade to Premium"
                variant="primary"
                size="md"
                fullWidth
                onPress={handleUpgradeToPremium}
                style={styles.upgradeButton}
              />
            )}
          </GlassCard>

          {/* Subscription Status */}
          <GlassCard variant="default" style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Subscription
              </Text>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: userData.isPremium ? colors.success : colors.surfaceVariant }
              ]}>
                <Text style={[
                  styles.statusText, 
                  { color: userData.isPremium ? colors.surface : colors.textSecondary }
                ]}>
                  {userData.isPremium ? 'Premium' : 'Free'}
                </Text>
              </View>
            </View>
            
            {userData.isPremium ? (
              <View style={styles.premiumInfo}>
                <Text style={[styles.premiumText, { color: colors.textSecondary }]}>
                  ✨ Unlimited transformations
                </Text>
                <Text style={[styles.premiumText, { color: colors.textSecondary }]}>
                  🚫 No watermarks
                </Text>
                <Text style={[styles.premiumText, { color: colors.textSecondary }]}>
                  ⚡ Priority processing
                </Text>
              </View>
            ) : (
              <View style={styles.freeInfo}>
                <Text style={[styles.freeText, { color: colors.textSecondary }]}>
                  • 3 transformations per month
                </Text>
                <Text style={[styles.freeText, { color: colors.textSecondary }]}>
                  • Images include watermark
                </Text>
                <Text style={[styles.freeText, { color: colors.textSecondary }]}>
                  • Standard processing speed
                </Text>
              </View>
            )}
          </GlassCard>

          {/* Settings */}
          <GlassCard variant="default" style={styles.settingsCard}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Settings
            </Text>
            
            <View style={styles.settingsList}>
              <SettingItem
                icon="🌙"
                title="Dark Mode"
                value={darkMode}
                onToggle={setDarkMode}
                colors={colors}
                type="toggle"
              />
              
              <SettingItem
                icon="📊"
                title="Usage Statistics"
                colors={colors}
                type="button"
                onPress={() => console.log('Show usage stats')}
              />
              
              <SettingItem
                icon="💳"
                title="Billing & Payments"
                colors={colors}
                type="button"
                onPress={() => console.log('Show billing')}
              />
              
              <SettingItem
                icon="❓"
                title="Help & Support"
                colors={colors}
                type="button"
                onPress={() => console.log('Show help')}
              />
              
              <SettingItem
                icon="📄"
                title="Privacy Policy"
                colors={colors}
                type="button"
                onPress={() => console.log('Show privacy')}
              />
            </View>
          </GlassCard>

          {/* Account Info */}
          <GlassCard variant="outlined" style={styles.accountCard}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Account
            </Text>
            <View style={styles.accountInfo}>
              <Text style={[styles.accountText, { color: colors.textSecondary }]}>
                Member since {userData.joinDate}
              </Text>
              <GlassButton
                title="Sign Out"
                variant="secondary"
                size="sm"
                onPress={() => console.log('Sign out')}
                style={styles.signOutButton}
              />
            </View>
          </GlassCard>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

interface SettingItemProps {
  icon: string;
  title: string;
  colors: any;
  type: 'toggle' | 'button';
  value?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
}

function SettingItem({ icon, title, colors, type, value, onToggle, onPress }: SettingItemProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <Text style={[styles.settingTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
        />
      )}
      
      {type === 'button' && (
        <GlassButton
          title="View"
          variant="secondary"
          size="sm"
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  usageCard: {
    padding: 24,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  usageStats: {
    marginBottom: 20,
  },
  usageProgress: {
    marginBottom: 12,
  },
  progressBackground: {
    height: 8,
    backgroundColor: 'rgba(156, 163, 175, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  usageText: {
    fontSize: 14,
    textAlign: 'center',
  },
  limitReached: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  limitText: {
    fontSize: 14,
    fontWeight: '500',
  },
  upgradeButton: {
    marginTop: 8,
  },
  subscriptionCard: {
    padding: 24,
    marginBottom: 16,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  premiumInfo: {
    gap: 8,
  },
  premiumText: {
    fontSize: 14,
  },
  freeInfo: {
    gap: 4,
  },
  freeText: {
    fontSize: 14,
  },
  settingsCard: {
    padding: 24,
    marginBottom: 16,
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  accountCard: {
    padding: 24,
    marginBottom: 32,
  },
  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 14,
  },
  signOutButton: {
    paddingHorizontal: 16,
  },
  bottomSpacing: {
    height: 120, // Space for tab bar
  },
});