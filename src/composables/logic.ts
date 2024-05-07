// import type { BlockState } from '../types'
import type { Ref } from 'vue'

interface XyyxState {
  board: number[][]
}

export class Xyyx {
  state = ref() as Ref<XyyxState>

  blockShape = [
    [
      [
        [1, 1],
        [1, 1],
      ],
    ],
    [[[2, 2, 2, 2]], [[2], [2], [2], [2]]],
    [
      [
        [3, 3, 0],
        [0, 3, 3],
      ],
      [
        [0, 3],
        [3, 3],
        [3, 0],
      ],
    ],
    [
      [
        [0, 4, 4],
        [4, 4, 0],
      ],
      [
        [4, 0],
        [4, 4],
        [0, 4],
      ],
    ],
    [
      [
        [5, 0, 0],
        [5, 5, 5],
      ],
      [
        [5, 5],
        [5, 0],
        [5, 0],
      ],
      [
        [5, 5, 5],
        [0, 0, 5],
      ],
      [
        [0, 5],
        [0, 5],
        [5, 5],
      ],
    ],
    [
      [
        [0, 0, 6],
        [6, 6, 6],
      ],
      [
        [6, 6],
        [0, 6],
        [0, 6],
      ],
      [
        [6, 6, 6],
        [6, 0, 0],
      ],
      [
        [6, 0],
        [6, 0],
        [6, 6],
      ],
    ],
    [
      [
        [0, 7, 0],
        [7, 7, 7],
      ],
      [
        [7, 7, 7],
        [0, 7, 0],
      ],
      [
        [7, 0],
        [7, 7],
        [7, 0],
      ],
      [
        [0, 7],
        [7, 7],
        [0, 7],
      ],
    ],
    [
      [
        [0, 8, 0],
        [8, 8, 8],
        [0, 8, 0],
      ],
    ],
    [[[9]]],
    [[[10, 10]], [[10], [10]]],
    [
      [
        [11, 11],
        [11, 0],
      ],
      [
        [11, 11],
        [0, 11],
      ],
      [
        [0, 11],
        [11, 11],
      ],
      [
        [11, 0],
        [11, 11],
      ],
    ],
  ]

  m: number = 0
  n: number = 0
  a: number[][] = []
  l: number[] = []
  allResult: number[][][] = []

  constructor(
    public row: number,
    public col: number,
  ) {
    this.reset()
  }

  get board() {
    return this.state.value.board
  }

  reset(row = this.row, col = this.col) {
    this.row = row
    this.col = col
    this.state.value = {
      board: Array.from({ length: this.row }, () => Array.from({ length: col }, () => -1)),
    }
    /* for (let i = 0; i < row; ++i) {
      this.state.value.board[i] = Array.from({ length: col }, () => -1)
    } */

    console.log(this.state.value)
  }

  onClick(block: number, x: number, y: number) {
    if (block === 0) {
      // block = -1
      this.state.value.board[y][x] = -1
    } else if (block === -1) {
      // block = 0
      this.state.value.board[y][x] = 0
    }

    console.log(this.state.value)
  }

  computeAllResolution(serialNumberArr: number[]) {
    this.m = this.board.length
    this.n = this.board[0].length
    this.a = Array.from({ length: this.m }, () => [])
    this.l = []
    this.allResult = []

    for (let i = 0; i < this.m; ++i) {
      this.a[i] = this.board[i].map(x => x)
    }
    // console.log(this.a)

    this.l = serialNumberArr.map(x => x)
    // console.log(this.a, this.l)

    this.dfs(0)
    // console.log(this.allResult)

    if (!this.allResult.length) {
      window.$message?.error('未找到任何结果，适当调整方块数量吧')
    }

    return this.allResult.length
  }

  canPlaceBlock(x: number, y: number, b: number, d: number) {
    const pat = this.blockShape[b][d]
    let offset = 0
    while (!pat[0][offset]) ++offset
    y -= offset
    if (y < 0) return false
    for (let i = 0; i < pat.length; ++i) {
      for (let j = 0; j < pat[0].length; ++j) {
        if (pat[i][j] && (x + i >= this.m || y + j >= this.n || this.a[x + i][y + j] !== -1))
          return false
      }
    }
    return true
  }

  placeBlock(x: number, y: number, b: number, d: number, v: number) {
    const pat = this.blockShape[b][d]
    let offset = 0
    while (!pat[0][offset]) ++offset
    y -= offset

    for (let i = 0; i < pat.length; ++i) {
      for (let j = 0; j < pat[0].length; ++j) {
        if (pat[i][j]) this.a[x + i][y + j] = v
      }
    }
  }

  dfs(p: number) {
    if (p === this.m * this.n) {
      const x = Array.from({ length: this.m }, () => []) as number[][]
      for (let i = 0; i < this.m; ++i) {
        x[i] = this.a[i].map(x => x)
      }
      this.allResult.push(x)
      if (this.allResult.length >= 10000) {
        // alert('方案数太多，仅计算前一万种。减少一些方块吧~')
        return true
      }
      return false
    }
    const x = Math.floor(p / this.n)
    const y = p % this.n
    if (this.a[x][y] !== -1) {
      if (this.dfs(p + 1)) return true
      return false
    }

    for (let b = 0; b < this.blockShape.length; ++b) {
      if (!this.l[b]) continue
      for (let d = 0; d < this.blockShape[b].length; ++d) {
        if (!this.canPlaceBlock(x, y, b, d)) continue
        this.placeBlock(x, y, b, d, b + 1)
        --this.l[b]
        if (this.dfs(p + 1)) return true
        ++this.l[b]
        this.placeBlock(x, y, b, d, -1)
      }
    }
    return false
  }
}
