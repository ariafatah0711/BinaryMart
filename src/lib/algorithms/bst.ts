export interface SearchableProduct {
  name: string;
  category: string;
  brand: string;
}

class TreeNode<T extends SearchableProduct> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(
    public key: string,
    public product: T
  ) {}
}

export class ProductSearchTree<T extends SearchableProduct> {
  private root: TreeNode<T> | null = null;

  insert(product: T) {
    const key = product.name.toLowerCase();
    this.root = this.insertNode(this.root, key, product);
  }

  search(term: string) {
    const normalized = term.toLowerCase();
    const results: T[] = [];
    this.collectMatches(this.root, normalized, results);
    return results;
  }

  private insertNode(node: TreeNode<T> | null, key: string, product: T): TreeNode<T> {
    if (!node) return new TreeNode(key, product);

    if (key < node.key) {
      node.left = this.insertNode(node.left, key, product);
    } else {
      node.right = this.insertNode(node.right, key, product);
    }

    return node;
  }

  private collectMatches(node: TreeNode<T> | null, term: string, results: T[]) {
    if (!node) return;

    this.collectMatches(node.left, term, results);

    const product = node.product;
    const haystack = `${product.name} ${product.category} ${product.brand}`.toLowerCase();
    if (haystack.includes(term)) {
      results.push(product);
    }

    this.collectMatches(node.right, term, results);
  }
}
