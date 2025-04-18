import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExtractTextService } from './services/extract-text.service';
import { TextFromImg, Traceability } from './data/types';
import { ExtractElementsTextService } from './services/extract-elements-text.service';
import { CommonModule } from '@angular/common';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, WebcamModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
  image = signal<File | null>(null);
  ticket = signal<Traceability | undefined>({
    sscc: '',
    gtin: '',
  });
  textExtracted = signal<TextFromImg>({
    text: '',
  });
  isLoading = signal<boolean>(false);
  public trigger: Subject<void> = new Subject<void>();

  constructor(
    private extractedText: ExtractTextService,
    private extractedElementsFromText: ExtractElementsTextService
  ) { }

  uploadImage(e: Event): void {
    const img = e.target as HTMLInputElement;

    if (img.files && img.files[0]) {
      this.image.set(img.files[0]);
    } else {
      console.error('Aucun fichier sélectionné.');
    }
    console.log('Fichier reçu:', img);
  }

  submitImage(): void {
    const selectedFile = this.image();
    if (selectedFile !== null) {
      this.isLoading.set(true);
      this.extractedText.getExtracted(selectedFile).subscribe((response) => {
        console.log('Texte extrait:', response);
        this.textExtracted.update((t) => ({
          ...t,
          text: response.text,
        }));
        this.isLoading.set(false);
        this.obtainTraceability();
      });
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }

  obtainTraceability(): void {
    const payload: TextFromImg = { text: this.textExtracted().text };
    this.extractedElementsFromText
      .geExtractedElementsText(payload)
      .subscribe((response) => {
        console.log(response);
        this.ticket.update((d) => ({
          ...d,
          sscc: response.sscc,
          gtin: response.gtin,
        }));
      });
  }
}
