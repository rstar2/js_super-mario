import { Vector } from '../js/math';

test('Vector', () => {
    const v1 = new Vector(0,0);
    v1.set(10, 20);
    expect(v1.x).toBe(10);
    expect(v1.y).toBe(20);
  });