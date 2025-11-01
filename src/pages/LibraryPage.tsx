import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Code2, Home, Copy } from 'lucide-react';
import { LANGUAGES, LANGUAGE_DOCS, type Language } from '@/lib/languages';
import { useToast } from '@/hooks/use-toast';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<Language>('javascript');
  const { toast } = useToast();

  const filteredLanguages = Object.entries(LANGUAGES).filter(([key, lang]) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copié",
      description: "Code copié dans le presse-papiers",
    });
  };

  const currentDoc = LANGUAGE_DOCS[selectedLang];

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
                <BookOpen className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Bibliothèque de Langages</h1>
              </div>
            </div>
            
            <Link to="/ide">
              <Button className="gap-2 bg-primary text-primary-foreground">
                <Code2 className="w-4 h-4" />
                Ouvrir l'IDE
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Language List */}
          <div className="lg:col-span-1">
            <Card className="border-border bg-card sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Langages</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredLanguages.map(([key, lang]) => (
                  <Button
                    key={key}
                    variant={selectedLang === key ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedLang(key as Language)}
                  >
                    {lang.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Documentation */}
          <div className="lg:col-span-3">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl">{LANGUAGES[selectedLang].name}</CardTitle>
                <CardDescription>{LANGUAGES[selectedLang].description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="basics" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basics">Bases</TabsTrigger>
                    <TabsTrigger value="syntax">Syntaxe</TabsTrigger>
                    <TabsTrigger value="examples">Exemples</TabsTrigger>
                    <TabsTrigger value="resources">Ressources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basics" className="space-y-4 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Introduction</h3>
                      <p className="text-muted-foreground">{currentDoc.introduction}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Caractéristiques</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {currentDoc.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="syntax" className="space-y-4 mt-6">
                    {currentDoc.syntax.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(item.code)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="bg-code-bg rounded-lg p-4 overflow-x-auto">
                          <pre className="text-code-foreground text-sm">
                            <code>{item.code}</code>
                          </pre>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4 mt-6">
                    {currentDoc.examples.map((example, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{example.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(example.code)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{example.description}</p>
                        <div className="bg-code-bg rounded-lg p-4 overflow-x-auto">
                          <pre className="text-code-foreground text-sm">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-4 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">Ressources Utiles</h3>
                      <div className="space-y-2">
                        {currentDoc.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                          >
                            <p className="font-medium text-foreground">{resource.title}</p>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
