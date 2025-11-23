import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Test Component</h1>
      <p>Si ves esto, Angular está funcionando correctamente.</p>
      <p>El error debe estar en algún otro componente o servicio.</p>
    </div>
  `
})
export class TestComponent {}