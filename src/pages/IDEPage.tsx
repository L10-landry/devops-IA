import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Play, Save, Download, Home, Trash2, Copy, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { executeCode } from '@/lib/code-executor';
import { LANGUAGES, type Language } from '@/lib/languages';

export default function IDEPage() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(LANGUAGES.javascript.template);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setCode(LANGUAGES[language].template);
  }, [language]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Exécution en cours...\n');
    
    try {
      const result = await executeCode(code, language);
      setOutput(result);
      toast({
        title: "Exécution réussie",
        description: "Le code a été exécuté avec succès",
      });
    } catch (error: any) {
      setOutput(`Erreur: ${error.message}`);
      toast({
        title: "Erreur d'exécution",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem(`code_${language}`, code);
    toast({
      title: "Code sauvegardé",
      description: `Votre code ${LANGUAGES[language].name} a été sauvegardé`,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${LANGUAGES[language].extension}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Téléchargement",
      description: "Fichier téléchargé avec succès",
    });
  };

  const handleClear = () => {
    setCode(LANGUAGES[language].template);
    setOutput('');
    toast({
      title: "Éditeur réinitialisé",
      description: "Le code a été effacé",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copié",
      description: "Code copié dans le presse-papiers",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  Accueil
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Code2 className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">IDE Multi-Langages</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGES).map(([key, lang]) => (
                    <SelectItem key={key} value={key}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Link to="/voice">
                <Button variant="outline" size="sm" className="gap-2">
                  <Mic className="w-4 h-4" />
                  Assistant Vocal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="ml-4 text-sm font-medium text-foreground">
                    {LANGUAGES[language].name}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleClear}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="gap-2 bg-primary text-primary-foreground"
                  >
                    <Play className="w-4 h-4" />
                    Exécuter
                  </Button>
                </div>
              </div>
              
              <div className="h-[600px]">
                <Editor
                  height="100%"
                  language={LANGUAGES[language].monacoLang}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Output Console */}
            <Card className="border-border bg-card">
              <Tabs defaultValue="output" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="output">Console</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="output" className="p-4">
                  <div className="bg-code-bg rounded-lg p-4 h-64 overflow-auto font-mono text-sm text-code-foreground">
                    <pre className="whitespace-pre-wrap">{output || 'Aucune sortie'}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="p-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-foreground">Langage:</p>
                      <p className="text-muted-foreground">{LANGUAGES[language].name}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Extension:</p>
                      <p className="text-muted-foreground">.{LANGUAGES[language].extension}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Description:</p>
                      <p className="text-muted-foreground">{LANGUAGES[language].description}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border bg-card p-4">
              <h3 className="font-semibold mb-3 text-foreground">Actions Rapides</h3>
              <div className="space-y-2">
                <Link to="/library" className="block">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Code2 className="w-4 h-4" />
                    Voir la Documentation
                  </Button>
                </Link>
                <Link to="/voice" className="block">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Mic className="w-4 h-4" />
                    Assistant Vocal
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Tips */}
            <Card className="border-border bg-card p-4">
              <h3 className="font-semibold mb-3 text-foreground">💡 Astuces</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Ctrl+S pour sauvegarder</li>
                <li>• Ctrl+Enter pour exécuter</li>
                <li>• Utilisez l'assistant vocal pour dicter du code</li>
                <li>• Consultez la bibliothèque pour des exemples</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
