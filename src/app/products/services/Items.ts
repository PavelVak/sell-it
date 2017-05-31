export class Item {
  public id: number;
  public title: string;
  public imageSrc: string;

  constructor (id: number, title: string, imageSrc: string) {
    this.id = id;
    this.title = title;
    this.imageSrc = imageSrc;
  }
}
