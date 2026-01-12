import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar, Film, Music } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Promotionnelle",
      description: "Valoriser votre entreprise et vos produits",
      details: "Vidéos corporate, contenus pour réseaux sociaux (Reel, Short, TikTok), interviews d'entreprise - nous créons des contenus impactants qui renforcent votre image de marque.",
    },
    {
      icon: Calendar,
      title: "Événementiel",
      description: "Capturer vos moments d'exception",
      details: "Mariages, soirées d'entreprise, séminaires, conférences, anniversaires - nous immortalisons vos événements avec un regard professionnel et discret.",
    },
    {
      icon: Film,
      title: "Court-métrage",
      description: "Raconter des histoires qui marquent",
      details: "De l'écriture à la post-production, nous donnons vie à vos projets cinématographiques avec créativité et professionnalisme, en collaboration avec notre équipe du cinéma et de la télévision.",
    },
    {
      icon: Music,
      title: "Concert",
      description: "Immortaliser la magie musicale",
      details: "Captation de concerts, festivals, sessions live - nous capturons l'énergie et l'émotion de vos performances musicales avec un savoir-faire technique et artistique.",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-anton text-5xl md:text-7xl tracking-wider mb-4">
            NOS SERVICES
          </h2>
          <p className="font-montserrat text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions audiovisuelles adaptées à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border bg-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 inline-block p-3 bg-accent rounded-lg group-hover:bg-primary transition-colors">
                  <service.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="font-anton text-3xl tracking-wider">
                  {service.title}
                </CardTitle>
                <CardDescription className="font-montserrat text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">
                  {service.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;