interface Node<TElement> {
  data: TElement;
  previous?: Node<TElement>;
  next?: Node<TElement>;
}

export class LinkedList<TElement> {
  #size: number = 0;
  #head: Node<TElement> | undefined = undefined;
  #tail: Node<TElement> | undefined = undefined;

  public push(element: TElement): void {
    const node: Node<TElement> = this.wrapElementAsNode(element);

    if (!this.#tail) {
      this.setAsFirstElement(node);
    } else {
      node.previous = this.#tail;
      node.previous.next = node;
    }

    this.#tail = node;
    this.#size++;
  }

  private wrapElementAsNode(element: TElement): Node<TElement> {
    return { data: element };
  }

  private setAsFirstElement(node: Node<TElement>) {
    this.#head = node;
    this.#tail = node;
  }

  private reduceSize() {
    this.#size--;
    if (!this.#size) {
      this.#head = undefined;
      this.#tail = undefined;
    }
  }

  public pop(): TElement | undefined {
    let result = undefined;
    if (this.#tail) {
      result = this.#tail.data;
      if (this.#tail.previous) {
        this.#tail.previous.next = undefined;
      }
      this.#tail = this.#tail.previous;
      this.reduceSize();
    }

    return result;
  }

  public shift(): TElement | undefined {
    let result = undefined;
    if (this.#head) {
      result = this.#head.data;
      if (this.#head.next) {
        this.#head.next.previous = undefined;
      }
      this.#head = this.#head.next;
      this.reduceSize();
    }

    return result;
  }

  public unshift(element: TElement): void {
    const node: Node<TElement> = this.wrapElementAsNode(element);

    if (!this.#head) {
      this.setAsFirstElement(node);
    } else {
      node.next = this.#head;
      node.next.previous = node;
    }

    this.#head = node;
    this.#size++;
  }

  public delete(element: TElement): void {
    const node = this.findNode(element);
    if (node) {
      if (node.previous) {
        node.previous.next = node.next;
      }

      if (node.next) {
        node.next.previous = node.previous;
      }

      this.reduceSize();
    }
  }

  private findNode(element: TElement): Node<TElement> | undefined {
    let curr: Node<TElement> | undefined = this.#head;
    while (curr) {
      if (curr.data === element) {
        return curr;
      }
      curr = curr.next;
    }

    return undefined;
  }

  public count(): number {
    return this.#size;
  }
}
