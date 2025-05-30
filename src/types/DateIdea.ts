export type DateIdea = {
  id: string
  name: string,
  location: string,
  city: string,
  state: string,
  google_maps_link: string,
  list: string
  notes: string,
}

export class Place {
  public id: string = '';
  public name: string = '';
  public location: string = '';
  public city: string = '';
  public state: string = '';
  public google_maps_link: string = '';
  public list: string = '';
  public notes: string = '';

  *[Symbol.iterator](): IterableIterator<string> {
    yield this.id;
    yield this.name;
    yield this.location;
    yield this.city;
    yield this.state;
    yield this.google_maps_link;
    yield this.list;
    yield this.notes;
  }
}