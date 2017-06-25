export class AddProduct {
  public title: string;
  public description: string;
  public author: number;
  public price: number;
  public photos: any;

  constructor(data){
    this.title = data.title;
    this.description = data.description;
    this.author = data.author;
    this.price = data.price;
    this.photos = data.photos;
  }

}
