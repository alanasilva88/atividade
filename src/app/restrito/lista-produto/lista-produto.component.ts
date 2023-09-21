import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/produto.service';
import { OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit{

  public produtos: Produto[] = [];
  private _produtoService: any;

  constructor(private_produtoService: ProdutoService, private _router: Router,
    private _loginService: LoginService){}

  ngOnInit(): void {
    this.listarProdutos();
    this._loginService.setMostraMenu(false);

  }

  listarProdutos(): void {
    this._produtoService.getProdutos().subscribe(
      (      retornaProduto: any[]) => {
        this.produtos = retornaProduto.map(
          item => {
            return new Produto(
              item.id,
              item.produto,
              item.descricao,
              item.foto,
              item.preco
            );
          }
        )
      }
    )
  }

  excluir(id: number){
    this._produtoService.removerProduto(id).subscribe(
      () => {
        this.listarProdutos();
      },
      () => {alert("Erro ao excluir")}
    );
      this._router.navigate(["/restrito/lista"]);
  }

}
