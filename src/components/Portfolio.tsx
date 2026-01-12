import { Card } from "@/components/ui/card";
import { Play, Video, Calendar, Film, Music, X, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const { portfolioData, loading, error, refetch } = usePortfolioData();
  
  const finalPortfolioData = portfolioData;

  const getEmbedUrl = (url: string) => {
    if (!url) return url;
    
    if (url.includes('/preview') || url.includes('player.vimeo.com') || url.includes('youtube.com/embed')) {
      return url;
    }
    
    const fileIdMatch = url.match(/\/d\/([^/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
    }
    
    return url;
  };

  const categories = [
    {
      key: 'promotionelle',
      title: 'Promotionnelle',
      icon: Video,
      projects: finalPortfolioData.promotionelle || []
    },
    {
      key: 'evenementiel', 
      title: 'Événementiel',
      icon: Calendar,
      projects: finalPortfolioData.evenementiel || []
    },
    {
      key: 'courtmetrage',
      title: 'Court-métrage', 
      icon: Film,
      projects: finalPortfolioData.courtmetrage || []
    },
    {
      key: 'concert',
      title: 'Concert',
      icon: Music,
      projects: finalPortfolioData.concert || []
    }
  ];

  const openProject = (project: any) => {
    setSelectedProject(project);
    setSelectedMediaIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setSelectedMediaIndex(0);
  };

  const nextMedia = () => {
    if (selectedProject && selectedMediaIndex < selectedProject.medias.length - 1) {
      setSelectedMediaIndex(selectedMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (selectedMediaIndex > 0) {
      setSelectedMediaIndex(selectedMediaIndex - 1);
    }
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-anton text-5xl md:text-7xl tracking-wider mb-4">
              PORTFOLIO
            </h2>
            <p className="font-montserrat text-lg text-muted-foreground max-w-2xl mx-auto">
              Chargement des projets depuis Google Drive...
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <span className="font-montserrat text-muted-foreground">Connexion en cours...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-anton text-5xl md:text-7xl tracking-wider mb-4">
              PORTFOLIO
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <p className="font-montserrat text-lg text-red-700">Impossible de charger le portfolio</p>
                </div>
                <p className="font-montserrat text-sm text-red-600 mb-4">
                  {error}
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={refetch}
                    className="w-full font-montserrat"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Réessayer de se connecter
                  </Button>
                  <div className="text-xs text-red-500 font-montserrat">
                    Vérifiez que votre clé API Google Drive est correcte et que le dossier est accessible.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (Object.values(finalPortfolioData).every(category => category.length === 0)) {
    return (
      <section id="portfolio" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-anton text-5xl md:text-7xl tracking-wider mb-4">
              PORTFOLIO
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                  <p className="font-montserrat text-lg text-yellow-700">Portfolio en cours de préparation</p>
                </div>
                <p className="font-montserrat text-sm text-yellow-600 mb-4">
                  Aucun projet trouvé dans Google Drive. Vérifiez que vos dossiers contiennent des projets avec les fichiers requis (main.jpg + vidéo).
                </p>
                <Button 
                  onClick={refetch}
                  variant="outline"
                  className="w-full font-montserrat border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-anton text-5xl md:text-7xl tracking-wider mb-4">
            PORTFOLIO
          </h2>
          <p className="font-montserrat text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos réalisations classées par service
          </p>
        </div>

        {/* Layout 4 colonnes pour desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {categories.map((category, categoryIndex) => (
            <div key={category.key} className="flex flex-col animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
              <div className="bg-background text-foreground p-4 flex items-center justify-center border-b-2 border-accent">
                <div className="flex flex-col items-center space-y-2">
                  <category.icon className="w-8 h-8 text-accent" />
                  <span className="font-anton text-sm tracking-wider text-center">
                    {category.title}
                  </span>
                </div>
              </div>
              
              <div className="bg-card flex-1">
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
                  {category.projects.length > 0 ? (
                    category.projects.map((project, index) => (
                      <Card
                        key={`${project.title}-${index}`}
                        onClick={() => openProject(project)}
                        className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              console.error('❌ Erreur thumbnail:', project.thumbnail);
                              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 group-hover:to-black/60 transition-all" />
                          
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {project.medias?.length || 1}
                          </div>
                          
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-accent/20 backdrop-blur-sm rounded-full p-3 border border-accent">
                              <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <h4 className="font-anton text-sm tracking-wider mb-1 line-clamp-1">
                            {project.title}
                          </h4>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-muted-foreground mb-2">
                        <category.icon className="w-12 h-12 mx-auto opacity-50" />
                      </div>
                      <p className="font-montserrat text-sm text-muted-foreground">
                        Projets en cours d'ajout
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Versions tablet */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-6">
          {categories.map((category, categoryIndex) => (
            <div key={category.key} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
              <div className="bg-background text-foreground p-4 flex items-center justify-center border-b-2 border-accent">
                <div className="flex items-center space-x-3">
                  <category.icon className="w-6 h-6 text-accent" />
                  <span className="font-anton text-lg tracking-wider">
                    {category.title}
                  </span>
                </div>
              </div>
              <div className="bg-card p-4">
                <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto scrollbar-hide">
                  {category.projects.length > 0 ? (
                    category.projects.slice(0, 3).map((project, index) => (
                      <Card
                        key={`tablet-${project.title}-${index}`}
                        onClick={() => openProject(project)}
                        className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {project.medias?.length || 1}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-accent/20 backdrop-blur-sm rounded-full p-3 border border-accent">
                              <ImageIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <h4 className="font-anton text-sm tracking-wider mb-1">
                            {project.title}
                          </h4>
                          <p className="font-montserrat text-xs opacity-90">
                            {project.description}
                          </p>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <category.icon className="w-8 h-8 mx-auto text-muted-foreground opacity-50 mb-2" />
                      <p className="font-montserrat text-sm text-muted-foreground">
                        Projets en cours d'ajout
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Version mobile */}
        <div className="sm:hidden space-y-8">
          {categories.map((category, categoryIndex) => (
            <div key={category.key} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
              <div className="bg-background text-foreground p-4 flex items-center justify-center border-b-2 border-accent">
                <div className="flex items-center space-x-3">
                  <category.icon className="w-6 h-6 text-accent" />
                  <span className="font-anton text-lg tracking-wider">
                    {category.title}
                  </span>
                </div>
              </div>
              <div className="bg-card p-4">
                <div className="space-y-4">
                  {category.projects.length > 0 ? (
                    category.projects.slice(0, 4).map((project, index) => (
                      <Card
                        key={`mobile-${project.title}-${index}`}
                        onClick={() => openProject(project)}
                        className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {project.medias?.length || 1}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-accent/20 backdrop-blur-sm rounded-full p-2 border border-accent">
                              <ImageIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                          <h4 className="font-anton text-xs tracking-wider mb-1">
                            {project.title}
                          </h4>
                          <p className="font-montserrat text-xs opacity-90">
                            {project.description}
                          </p>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <category.icon className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-2" />
                      <p className="font-montserrat text-sm text-muted-foreground">
                        Projets en cours d'ajout
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal RESPONSIVE ET CORRIGÉE */}
        <Dialog open={!!selectedProject} onOpenChange={closeProject}>
          <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw] p-0 overflow-hidden bg-black border-none">
            {selectedProject && (
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-3 md:p-4 bg-black text-white border-b border-gray-800 flex-shrink-0">
                  <div className="flex-1 pr-3">
                    <h3 className="font-anton text-base md:text-xl tracking-wider">{selectedProject.title}</h3>
                    <p className="font-montserrat text-xs md:text-sm text-gray-300 hidden sm:block">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={closeProject}
                    className="text-white hover:text-gray-300 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  {/* Zone média principale - CORRECTION RESPONSIVE */}
                  <div className="flex-1 relative bg-black min-h-0 overflow-hidden">
                    {selectedProject.medias && selectedProject.medias[selectedMediaIndex] && (
                      <>
                        {selectedProject.medias[selectedMediaIndex].type === 'video' ? (
                          <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
                            <iframe
                              src={getEmbedUrl(selectedProject.medias[selectedMediaIndex].src)}
                              className="w-full h-full"
                              style={{ 
                                border: 'none',
                                maxWidth: '100%',
                                maxHeight: '100%'
                              }}
                              allow="autoplay; fullscreen"
                              title={selectedProject.medias[selectedMediaIndex].title}
                            />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
                            <img
                              src={selectedProject.medias[selectedMediaIndex].src}
                              alt={selectedProject.medias[selectedMediaIndex].title}
                              className="max-w-full max-h-full w-auto h-auto object-contain"
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                console.error('❌ Erreur image modal:', selectedProject.medias[selectedMediaIndex].src);
                                target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
                              }}
                            />
                          </div>
                        )}

                        {/* Navigation flèches */}
                        {selectedProject.medias.length > 1 && (
                          <>
                            <button
                              onClick={prevMedia}
                              disabled={selectedMediaIndex === 0}
                              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-2 md:p-4 rounded-full hover:bg-black/90 transition-all z-20 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                            >
                              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                            </button>
                            <button
                              onClick={nextMedia}
                              disabled={selectedMediaIndex === selectedProject.medias.length - 1}
                              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-2 md:p-4 rounded-full hover:bg-black/90 transition-all z-20 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                            >
                              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                            </button>
                          </>
                        )}

                        {/* Compteur de médias */}
                        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-montserrat z-20 shadow-lg">
                          {selectedMediaIndex + 1} / {selectedProject.medias.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Sidebar des miniatures */}
                  {selectedProject.medias && selectedProject.medias.length > 1 && (
                    <div className="w-full md:w-80 h-48 md:h-auto bg-gray-900 border-t md:border-t-0 md:border-l border-gray-700 flex flex-col">
                      <div className="p-3 md:p-4 border-b border-gray-700 flex-shrink-0">
                        <h4 className="font-anton text-white text-xs md:text-sm tracking-wider">
                          TOUS LES MÉDIAS ({selectedProject.medias.length})
                        </h4>
                      </div>
                      
                      <div className="flex-1 overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto custom-scrollbar">
                        <div className="flex md:flex-col p-3 md:p-4 space-x-3 md:space-x-0 md:space-y-3">
                          {selectedProject.medias.map((media: any, index: number) => (
                            <div
                              key={`${media.fileId}-${index}`}
                              onClick={() => setSelectedMediaIndex(index)}
                              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all flex-shrink-0 w-32 md:w-auto ${
                                selectedMediaIndex === index 
                                  ? 'ring-2 ring-blue-500 shadow-lg' 
                                  : 'hover:ring-1 hover:ring-gray-400'
                              }`}
                            >
                              <div className="aspect-video relative">
                                <img
                                  src={media.thumbnail}
                                  alt={media.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    console.error('❌ Erreur thumbnail sidebar:', media.thumbnail);
                                    if (media.type === 'image') {
                                      target.src = media.src;
                                    } else {
                                      target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1lZGlhPC90ZXh0Pjwvc3ZnPg==";
                                    }
                                  }}
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                                  <div className="absolute top-1 md:top-2 right-1 md:right-2">
                                    <div className="bg-black/60 rounded-full p-0.5 md:p-1">
                                      {media.type === 'video' ? (
                                        <Play className="w-3 h-3 md:w-4 md:h-4 text-white" fill="white" />
                                      ) : (
                                        <ImageIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {selectedMediaIndex === index && (
                                  <div className="absolute top-1 md:top-2 left-1 md:left-2">
                                    <div className="bg-blue-500 rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* CSS personnalisé */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4a5568 #2d3748;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d3748;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;