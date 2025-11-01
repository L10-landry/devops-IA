
import { Link } from 'react-router-dom';
import { Code2, BookOpen, Mic, Play, Sparkles, Zap, Globe, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Assistant de Codage Intelligent</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent gradient-primary">
              Codez Plus Vite, Apprenez Mieux
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un IDE complet avec support multi-langages, assistance vocale et bibliothèque de référence pour tous vos besoins de développement
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/ide">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Code2 className="w-5 h-5" />
                  Ouvrir l'IDE
                </Button>
              </Link>
              <Link to="/library">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Bibliothèque
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Fonctionnalités Principales</h2>
          <p className="text-muted-foreground text-lg">Tout ce dont vous avez besoin pour coder efficacement</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <Terminal className="w-12 h-12 text-primary mb-4" />
              <CardTitle>IDE Intégré</CardTitle>
              <CardDescription>
                Éditeur de code complet avec coloration syntaxique et auto-complétion
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <Globe className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Multi-Langages</CardTitle>
              <CardDescription>
                Support de JavaScript, Python, Java, C++, HTML, CSS et plus encore
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <Play className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Exécution Directe</CardTitle>
              <CardDescription>
                Compilez et exécutez votre code directement dans le navigateur
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mic className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Assistant Vocal</CardTitle>
              <CardDescription>
                Interaction vocale pour coder sans taper manuellement
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Languages Section */}
      <section className="container mx-auto px-4 py-20 bg-secondary/30">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Langages Supportés</h2>
          <p className="text-muted-foreground text-lg">Une bibliothèque complète pour tous les développeurs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {['JavaScript', 'Python', 'Java', 'C++', 'HTML', 'CSS', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift'].map((lang) => (
            <Card key={lang} className="border-border bg-card text-center hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <Code2 className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground">{lang}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-primary/20 bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Prêt à Commencer ?</h2>
            <p className="text-lg mb-8 opacity-90">
              Lancez-vous dans le développement avec notre assistant intelligent
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/ide">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Code2 className="w-5 h-5" />
                  Commencer à Coder
                </Button>
              </Link>
              <Link to="/voice">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Mic className="w-5 h-5" />
                  Essayer l'Assistant Vocal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}