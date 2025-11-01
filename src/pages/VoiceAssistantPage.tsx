
import { Card } from '@/components/ui/card';
import { Mic } from 'lucide-react';

export default function VoiceAssistantPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Mic className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Assistant Vocal</h1>
        </div>
        <div className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Assistant vocal - À implémenter</p>
        </div>
      </Card>
    </div>
  );
}