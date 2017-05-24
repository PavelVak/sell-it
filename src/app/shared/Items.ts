export class Item{
  id : number;
  title: string;
  imageSrc: string;

  constructor (id: number, title: string, imageSrc: string){
    this.id = id;
    this.title = title;
    this.imageSrc = imageSrc;
  }
}
