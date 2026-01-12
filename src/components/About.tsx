import { Card, CardContent } from "@/components/ui/card";
import { Camera, Users, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Camera,
      title: "Photo & Vidéo",
      description: "Prestations complètes en photographie et production audiovisuelle avec des professionnels expérimentés",
    },
    {
      icon: Users,
      title: "Collaboration Expert",
      description: "Équipe de photographes et vidéastes issus du cinéma, télévision pour des créations d'exception",
    },
    {
      icon: Sparkles,
      title: "Créativité & Détail",
      description: "Chaque projet photo ou vidéo mené avec exigence, créativité et sens du détail pour valoriser votre image",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="font-anton text-5xl md:text-7xl tracking-wider mb-6">
              À PROPOS
            </h2>
            <div className="space-y-4 font-montserrat text-base md:text-lg text-foreground/90 leading-relaxed">
              <p>
                <strong className="font-semibold">LF Créatif Studio</strong> est un studio de production audiovisuelle et photographique spécialisé dans la création de contenus modernes et sur mesure.
              </p>
              <p>
                Nous collaborons avec des professionnels issus du <strong>cinéma</strong>, de la <strong>télévision</strong> et avec des <strong>photographes expérimentés</strong> afin d'offrir des prestations complètes en <strong>photo et vidéo</strong>.
              </p>
              <p>
                Nos réalisations couvrent un large éventail de besoins : <strong>sessions photo</strong>, <strong>shootings produits</strong>, <strong>portraits corporate</strong>, <strong>vidéos promotionnelles</strong>, contenus pour les <strong>réseaux sociaux</strong> (formats Reel, Short, TikTok), <strong>interviews</strong>, ainsi que la captation d'événements pour les entreprises ou les particuliers (mariages, soirées, séminaires, etc.).
              </p>
              <p>
                De la conception au montage, chaque projet <strong>photo ou vidéo</strong> est mené avec <strong>exigence</strong>, <strong>créativité</strong> et <strong>sens du détail</strong>, pour des contenus qui valorisent votre image et marquent les esprits.
              </p>
              <p className="text-accent font-medium">
                <strong>LF Créatif Studio : la créativité et le savoir-faire au service de vos projets visuels.</strong>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-border bg-card hover:shadow-lg transition-all duration-300 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="bg-accent p-3 rounded-lg flex-shrink-0">
                    <value.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-anton text-2xl tracking-wider mb-2">
                      {value.title}
                    </h3>
                    <p className="font-montserrat text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;