const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
}

interface MediaFile {
  type: 'video' | 'image';
  src: string;
  directUrl?: string;
  thumbnail: string;
  title: string;
  fileId: string;
}

interface PortfolioProject {
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  folderId: string;
  medias: MediaFile[];
}

class GoogleDriveService {
  private baseUrl = 'https://www.googleapis.com/drive/v3';
  
  async getCategoryFolders(): Promise<DriveFile[]> {
    try {
      const url = `${this.baseUrl}/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      return [];
    }
  }
  
  async getProjectsInFolder(folderId: string): Promise<DriveFile[]> {
    try {
      const url = `${this.baseUrl}/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      return [];
    }
  }
  
  async getFilesInProject(projectFolderId: string): Promise<DriveFile[]> {
    try {
      const url = `${this.baseUrl}/files?q='${projectFolderId}'+in+parents&fields=files(id,name,mimeType,webViewLink,webContentLink)&key=${API_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers:', error);
      return [];
    }
  }
  
  private isVideoFile(file: DriveFile): boolean {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v', '.wmv', '.flv'];
    const videoMimeTypes = ['video/', 'application/mxf'];
    
    const nameCheck = videoExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    const mimeCheck = videoMimeTypes.some(type => 
      file.mimeType.toLowerCase().includes(type.toLowerCase())
    );
    
    return nameCheck || mimeCheck;
  }
  
  private isImageFile(file: DriveFile): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    const imageMimeTypes = ['image/'];
    
    const nameCheck = imageExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    const mimeCheck = imageMimeTypes.some(type => 
      file.mimeType.toLowerCase().includes(type.toLowerCase())
    );
    
    return nameCheck || mimeCheck;
  }
  
  getThumbnailUrl(fileId: string, isVideo: boolean = false): string {
    if (isVideo) {
      return '';
    }
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
  }
  
  getImageDirectUrl(fileId: string): string {
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
  }
  
  getImageAlternativeUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  getVideoStreamUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  getVideoDirectUrl(fileId: string): string {
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
  }
  
  async buildPortfolioData(): Promise<Record<string, PortfolioProject[]>> {
    try {
      const categories = await this.getCategoryFolders();
      const portfolioData: Record<string, PortfolioProject[]> = {};
      
      for (const category of categories) {
        const categoryKey = this.getCategoryKey(category.name);
        const projects = await this.getProjectsInFolder(category.id);
        
        portfolioData[categoryKey] = [];
        
        for (const project of projects) {
          const files = await this.getFilesInProject(project.id);
          
          const mainThumbnail = files.find(f => 
            f.name.toLowerCase() === 'main.jpg' || 
            f.name.toLowerCase() === 'main.jpeg' ||
            f.name.toLowerCase() === 'main.png'
          );
          
          const mainVideo = files.find(f => this.isVideoFile(f));
          
          const allImages = files.filter(f => 
            this.isImageFile(f) && 
            f.name.toLowerCase() !== 'main.jpg' &&
            f.name.toLowerCase() !== 'main.jpeg' &&
            f.name.toLowerCase() !== 'main.png'
          );
          
          const allVideos = files.filter(f => this.isVideoFile(f));
          
          const medias: MediaFile[] = [];
          
          if (mainVideo) {
            const videoThumb = files.find(f => {
              const videoName = mainVideo.name.replace(/\.[^/.]+$/, '');
              return f.name.toLowerCase().includes(videoName.toLowerCase()) && 
                     f.name.toLowerCase().includes('thumb') &&
                     this.isImageFile(f);
            });
            
            medias.push({
              type: 'video',
              src: this.getVideoStreamUrl(mainVideo.id),
              directUrl: this.getVideoDirectUrl(mainVideo.id),
              thumbnail: videoThumb ? this.getThumbnailUrl(videoThumb.id, false) : '',
              title: mainVideo.name,
              fileId: mainVideo.id
            });
          }
          
          allVideos.filter(v => v.id !== mainVideo?.id).forEach(video => {
            const videoThumb = files.find(f => {
              const videoName = video.name.replace(/\.[^/.]+$/, '');
              return f.name.toLowerCase().includes(videoName.toLowerCase()) && 
                     f.name.toLowerCase().includes('thumb') &&
                     this.isImageFile(f);
            });
            
            medias.push({
              type: 'video',
              src: this.getVideoStreamUrl(video.id),
              directUrl: this.getVideoDirectUrl(video.id),
              thumbnail: videoThumb ? this.getThumbnailUrl(videoThumb.id, false) : '',
              title: video.name,
              fileId: video.id
            });
          });
          
          allImages.forEach(image => {
            medias.push({
              type: 'image',
              src: this.getImageDirectUrl(image.id),
              thumbnail: this.getThumbnailUrl(image.id, false),
              title: image.name,
              fileId: image.id
            });
          });
          
          if (mainThumbnail && (mainVideo || allImages.length > 0)) {
            const projectData: PortfolioProject = {
              title: project.name,
              description: `Projet ${category.name}`,
              thumbnail: this.getThumbnailUrl(mainThumbnail.id),
              video: mainVideo ? this.getVideoStreamUrl(mainVideo.id) : '',
              folderId: project.id,
              medias: medias
            };
            
            portfolioData[categoryKey].push(projectData);
          }
        }
      }
      
      return portfolioData;
    } catch (error) {
      console.error('Erreur lors du chargement depuis Google Drive:', error);
      return this.getFallbackData();
    }
  }
  
  private getCategoryKey(categoryName: string): string {
    const mapping: Record<string, string> = {
      'Promotionnelle': 'promotionelle',
      'Evenementiel': 'evenementiel',
      'Court-metrage': 'courtmetrage',
      'Concert': 'concert'
    };
    
    const result = mapping[categoryName];
    if (!result) {
      console.warn(`Catégorie non reconnue: "${categoryName}". Disponibles:`, Object.keys(mapping));
      return categoryName.toLowerCase();
    }
    
    return result;
  }
  
  private getFallbackData(): Record<string, PortfolioProject[]> {
    return {
      promotionnelle: [],
      evenementiel: [],
      courtmetrage: [],
      concert: []
    };
  }
}

export const driveService = new GoogleDriveService();
export type { PortfolioProject, MediaFile };