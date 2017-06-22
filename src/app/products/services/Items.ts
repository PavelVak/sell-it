export class Item {
  public id: number;
  public title: string;
  public imageSrc: string;

  constructor (id: number, title: string, imageSrc: string) {
    this.id = id;
    this.title = title;
    this.imageSrc = imageSrc;
  }

  // get firstImg() {
  //   return this.imageSrc.length > 0 ? this.imageSrc[0] : '';
  // }
}

export class ItemDetails{
  public id: number;
  public title: string;
  public description: string;
  public author: any;
  public price: string;
  public photoDetails: any[];

  constructor (id: number, title: string, description: string, author: any, price: string, photoDetails: any[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.price = price;
    this.photoDetails = photoDetails;
    console.log('construct item');
  }

}
