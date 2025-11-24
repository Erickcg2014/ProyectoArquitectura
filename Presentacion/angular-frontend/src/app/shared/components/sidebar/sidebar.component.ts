import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() itemSelected = new EventEmitter<string>();

  menuItems: SidebarItem[] = [
    {
      id: 'statistics',
      label: 'Estadísticas',
      icon: 'bar_chart',
      active: true,
    },
    { id: 'map', label: 'Mapa Interactivo', icon: 'map' },
    { id: 'timeline', label: 'Línea de Tiempo', icon: 'timeline' },
    { id: 'networks', label: 'Redes de Actores', icon: 'hub' },
    { id: 'conflicts', label: 'Conflictos Históricos', icon: 'history_edu' },
    { id: 'analysis', label: 'Análisis Avanzado', icon: 'analytics' },
  ];

  onToggle() {
    this.toggleSidebar.emit();
  }

  onSelectItem(itemId: string) {
    this.menuItems.forEach((item) => (item.active = item.id === itemId));
    this.itemSelected.emit(itemId);
  }
}
