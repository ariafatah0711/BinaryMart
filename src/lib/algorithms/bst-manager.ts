import { ProductNameTree } from "./bst-name";
import { ProductCategoryTree } from "./bst-kategory";
import { SearchableProduct } from "./bst";

export class BSTManager<T extends SearchableProduct> {
    private nameTree = new ProductNameTree<T>();
    private categoryTree = new ProductCategoryTree<T>();

    constructor(products: T[] = []) {
        this.build(products);
    }

    build(products: T[]) {
        for (const product of products) {
            this.nameTree.insert(product);
            this.categoryTree.insert(product);
        }
    }

    searchByName(name: string): T[] {
        return this.nameTree.searchByName(name);
    }

    searchByCategory(category: string): T[] {
        return this.categoryTree.searchByCategory(category);
    }

    search(keyword: string): T[] {
        return this.nameTree.search(keyword);
    }
}