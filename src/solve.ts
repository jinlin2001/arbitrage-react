import { String_Numbers } from './types';

function bellmanFord(matrix: number[][], index_name: string[]): String_Numbers {
  const result: String_Numbers = {};
  const vN = matrix.length;
  const eN = matrix.length - 1;
  const parent = new Array<number>(vN).fill(-1);
  const costs = new Array<number>(vN).fill(Number.POSITIVE_INFINITY);
  costs[0] = 0;
  // relax step:
  for (let e = 0; e < eN; e++) {
    for (let v1 = 0; v1 < vN; v1++) {
      for (let v2 = 0; v2 < vN; v2++) {
        const cost = costs[v1] + matrix[v1][v2];
        if (cost < costs[v2]) {
          costs[v2] = cost;
          parent[v2] = v1;
        }
      }
    }
  }
  // detect cycle:
  for (let v1 = 0; v1 < vN; v1++) {
    for (let v2 = 0; v2 < vN; v2++) {
      const cost = costs[v1] + matrix[v1][v2];
      if (cost < costs[v2]) {
        const cycle = getCycle(v2, parent);
        if (cycle) {
          result[cycleStr(cycle, index_name)] = cycle;
        }
      }
    }
  }
  return result;
}

function cycleStr(path: number[], index_name: string[]): string {
  const name_list: string[] = [];
  for (const index of path) {
    name_list.push(index_name[index]);
  }
  return name_list.join(' => ');
}

function toLog(matrix: number[][]) {
  const log_matrix: number[][] = [];

  for (const row of matrix) {
    const new_row = [];
    for (const col of row) {
      new_row.push(-Math.log(col));
    }
    log_matrix.push(new_row);
  }
  return log_matrix;
}

function getProfit(cycle: number[], matrix: number[][]) {
  let rate = 1;
  for (let i = 1; i < cycle.length; i++) {
    rate *= matrix[cycle[i - 1]][cycle[i]];
  }
  const profit = rate - 1;
  const profit_percentage = (profit * 100).toFixed(3);
  return profit_percentage;
}

function getCycle(from: number, parents: number[]) {
  let cycle: number[] | null = null;
  const path = [from];
  let index = 0;
  const visited = { [from]: index++ };
  let parent = parents[from];
  while (parent !== -1) {
    path.push(parent);
    if (parent in visited) {
      cycle = path.slice(visited[parent]).reverse();
      break;
    }
    visited[parent] = index++;
    parent = parents[parent];
  }
  return cycle;
}
export { bellmanFord, getProfit, toLog };
