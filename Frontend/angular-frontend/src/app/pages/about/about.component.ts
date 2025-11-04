import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background text-foreground p-8">
      <div class="container mx-auto max-w-4xl">
        <h1 class="text-4xl font-bold mb-6">Acerca del Proyecto</h1>
        <p class="text-lg text-muted-foreground mb-4">
          El Observatorio de Eventos Bélicos es una plataforma de análisis de datos de conflictos armados a nivel mundial.
        </p>
        <p class="text-lg text-muted-foreground mb-4">
          Utilizamos tres bases de datos principales:
        </p>
        <ul class="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li><strong>BigQuery:</strong> Análisis estadístico de eventos históricos</li>
          <li><strong>Neo4j:</strong> Relaciones entre actores y redes de conflictos</li>
          <li><strong>MongoDB:</strong> Datos geoespaciales y ubicaciones</li>
        </ul>
        <a routerLink="/" class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <span class="material-icons">arrow_back</span>
          Volver al Inicio
        </a>
      </div>
    </div>
  `
})
export class AboutComponent {}
