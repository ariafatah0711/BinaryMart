import { ProductSearchTree, SearchableProduct } from "./bst";

export class ProductCategoryTree<T extends SearchableProduct> extends ProductSearchTree<T> {
    searchByCategory(category: string): T[] {
        return this.search(category);
    }
}