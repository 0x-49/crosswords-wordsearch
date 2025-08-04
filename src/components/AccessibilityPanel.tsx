import React from 'react';
import { X, Settings, Sun, Moon, Monitor, Type, Eye, Zap, FileText, RotateCcw } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const AccessibilityPanel: React.FC = () => {
  const { settings, updateSetting, resetSettings, isSettingsPanelOpen, setIsSettingsPanelOpen } = useAccessibility();

  if (!isSettingsPanelOpen) return null;

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '14px base size' },
    { value: 'medium', label: 'Medium', description: '16px base size (default)' },
    { value: 'large', label: 'Large', description: '18px base size' },
    { value: 'extra-large', label: 'Extra Large', description: '20px base size' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Monitor },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsSettingsPanelOpen(false)}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Accessibility Settings</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSettingsPanelOpen(false)}
              aria-label="Close accessibility settings"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Theme Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Theme
                </CardTitle>
                <CardDescription>
                  Choose your preferred color theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={settings.theme}
                  onValueChange={(value: 'light' | 'dark' | 'auto') => updateSetting('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* High Contrast */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  High Contrast
                </CardTitle>
                <CardDescription>
                  Increase contrast for better visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="text-sm font-medium">
                    Enable high contrast mode
                  </Label>
                  <Switch
                    id="high-contrast"
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Font Size */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Font Size
                </CardTitle>
                <CardDescription>
                  Adjust the base font size for better readability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value: 'small' | 'medium' | 'large' | 'extra-large') => 
                    updateSetting('fontSize', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Large Text Mode */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Large Text Mode
                </CardTitle>
                <CardDescription>
                  Increase text size across the entire interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="large-text" className="text-sm font-medium">
                    Enable large text mode
                  </Label>
                  <Switch
                    id="large-text"
                    checked={settings.largeText}
                    onCheckedChange={(checked) => updateSetting('largeText', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This increases all text sizes by 25% for better readability
                </p>
              </CardContent>
            </Card>

            {/* Reduced Motion */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Reduced Motion
                </CardTitle>
                <CardDescription>
                  Minimize animations and transitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduced-motion" className="text-sm font-medium">
                    Reduce motion and animations
                  </Label>
                  <Switch
                    id="reduced-motion"
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Helpful for users with vestibular disorders or motion sensitivity
                </p>
              </CardContent>
            </Card>

            {/* Large Print Puzzles */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Large Print Puzzles
                </CardTitle>
                <CardDescription>
                  Generate puzzles with larger fonts and spacing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="large-print-puzzles" className="text-sm font-medium">
                    Enable large print puzzle generation
                  </Label>
                  <Switch
                    id="large-print-puzzles"
                    checked={settings.largePrintPuzzles}
                    onCheckedChange={(checked) => updateSetting('largePrintPuzzles', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Puzzles will use larger fonts, increased spacing, and bold text for better visibility
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Reset Settings */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={resetSettings}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-xs text-muted-foreground text-center space-y-2">
              <p>
                These settings are saved locally and will persist across sessions.
              </p>
              <p>
                For additional accessibility support, contact our team at{' '}
                <a href="mailto:accessibility@wordcraft.com" className="text-primary hover:underline">
                  accessibility@wordcraft.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;