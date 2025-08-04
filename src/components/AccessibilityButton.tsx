import React from 'react';
import { Settings } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AccessibilityButton: React.FC = () => {
  const { setIsSettingsPanelOpen } = useAccessibility();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsPanelOpen(true)}
            className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label="Open accessibility settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="mb-2">
          <p>Accessibility Settings</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AccessibilityButton;