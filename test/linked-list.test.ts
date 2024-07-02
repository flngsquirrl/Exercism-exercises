import { LinkedList } from '../src/linked-list';

describe('Linked List', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it('creates an empty list', () => {
    expect(list.count()).toBe(0);
  });

  it('pushes an element to the tail', () => {
    const element = 4;
    list.push(element);
    expect(list.count()).toBe(1);
  });

  it('pushes and pops the only element', () => {
    const element = 4;
    list.push(element);
    expect(list.pop()).toBe(element);
    expect(list.count()).toBe(0);
  });

  it('pushes and deletes the only element', () => {
    const element = 4;
    list.push(element);
    list.delete(element);
    expect(list.count()).toBe(0);
  });

  it('unshifts an element from the head', () => {
    const element = 4;
    list.unshift(element);
    expect(list.count()).toBe(1);
  });

  it('unshifts and shifts the only element', () => {
    const element = 4;
    list.unshift(element);
    expect(list.shift()).toBe(element);
    expect(list.count()).toBe(0);
  });

  it('pushes 2 elements and shifts the first one', () => {
    list.push(1);
    list.push(2);
    expect(list.shift()).toBe(1);
    expect(list.count()).toBe(1);
  });

  it('unshifts 2 elements and shifts the first one', () => {
    list.unshift(1);
    list.unshift(2);
    expect(list.shift()).toBe(2);
    expect(list.count()).toBe(1);
  });

  it('unshifts and deletes the only element', () => {
    const element = 4;
    list.unshift(element);
    list.delete(element);
    expect(list.count()).toBe(0);
  });

  it('pushes 3 elements and pops them one by one', () => {
    const elements = [11, 12, 13];
    elements.forEach(element => {
      list.push(element);
    });
    elements.reverse().forEach(element => {
      expect(list.pop()).toBe(element);
    });
    expect(list.count()).toBe(0);
  });

  it('pushes 3 elements and shifts them one by one', () => {
    const elements = [11, 12, 13];
    elements.forEach(element => {
      list.push(element);
    });
    elements.forEach(element => {
      expect(list.shift()).toBe(element);
    });
    expect(list.count()).toBe(0);
  });

  it('unshifts 3 elements and pops them one by one', () => {
    const elements = [11, 12, 13];
    elements.forEach(element => {
      list.unshift(element);
    });
    elements.forEach(element => {
      expect(list.pop()).toBe(element);
    });
    expect(list.count()).toBe(0);
  });

  it('unshifts 3 elements and shifts them one by one', () => {
    const elements = [11, 12, 13];
    elements.forEach(element => {
      list.unshift(element);
    });
    elements.reverse().forEach(element => {
      expect(list.shift()).toBe(element);
    });
    expect(list.count()).toBe(0);
  });

  it('pushes 3 elements, deletes the middle one, pops others one by one', () => {
    const elements = [11, 12, 13];
    elements.forEach(element => {
      list.push(element);
    });
    list.delete(12);
    elements.splice(1, 1);
    elements.reverse().forEach(element => {
      expect(list.pop()).toBe(element);
    });
    expect(list.count()).toBe(0);
  });

  it('tries to delete a non-existing element', () => {
    const elements = [11, 12, 13];
    elements.forEach(element => {
      list.push(element);
    });
    list.delete(14);
    expect(list.count()).toBe(elements.length);
  });

  it('pushes, pops and then pushes again', () => {
    list.push(4);
    list.pop();
    list.push(5);
    expect(list.count()).toBe(1);
    expect(list.pop()).toBe(5);
  });

  it('pushes, pops, unshifts and shifts', () => {
    list.push(10);
    list.pop();
    list.unshift(20);
    expect(list.count()).toBe(1);
    expect(list.shift()).toBe(20);
  });

  it('pushes, pops, unshifts and pops', () => {
    list.push(10);
    list.pop();
    list.unshift(20);
    expect(list.count()).toBe(1);
    expect(list.pop()).toBe(20);
  });
});
