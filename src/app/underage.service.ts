import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUnderage } from './underage';

@Injectable({
  providedIn: 'root'
})
export class UnderageService {
  chave = 'ChaveAcesso'
  private baseUrl = 'https://localhost:5000/underage';  
  
  constructor(private http: HttpClient) { }
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
  
  criarCadastro(inserir: IUnderage): Observable<any> {
    const url = `${this.baseUrl}/new`;
    return this.http.post(url, inserir, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  ObterLista(): Observable<IUnderage[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<IUnderage[]>(url);

  }

  AccessKey(): Observable<any> {
    const url = `${this.baseUrl}/key`;
    return this.http.post(url, {chave : this.chave}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro na requisição. Por favor, tente novamente.');
  }
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
