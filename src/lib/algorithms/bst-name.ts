import { ProductSearchTree, SearchableProduct } from "./bst";

export class ProductNameTree<T extends SearchableProduct> extends ProductSearchTree<T> {
    searchByName(name: string): T[] {
        return this.search(name);
    }
}