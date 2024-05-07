<script lang="ts" setup>
import { numberColorDict } from '~/composables/dict'
import Header from '../components/Header.vue'
import Block from '../components/Block.vue'
import { Xyyx } from '../composables/logic'
// import type { BlockState } from '../types'

const colRowData = $ref({
  rowNumber: 5,
  colNumber: 6,
})

let serialNumberArr = $ref(Array.from({ length: 11 }, () => 1))
let requiredBlockIndex = $ref(Array.from({ length: 11 }, () => -2))

onMounted(() => {
  if (localStorage.getItem('cbjqxyyxCache')) {
    const cachedData = JSON.parse(localStorage.getItem('cbjqxyyxCache')!)
    // cachedData = JSON.parse(cachedData)
    colRowData.rowNumber = cachedData.rowNumber || 5
    colRowData.colNumber = cachedData.colNumber || 6
    if (cachedData.serialNumberArr) {
      serialNumberArr = cachedData.serialNumberArr
    }
    if (cachedData.requiredBlockIndex) {
      requiredBlockIndex = cachedData.requiredBlockIndex
    }
  }

  window.addEventListener('beforeunload', () => {
    localStorage.setItem(
      'cbjqxyyxCache',
      JSON.stringify({
        rowNumber: colRowData.rowNumber,
        colNumber: colRowData.colNumber,
        serialNumberArr,
        requiredBlockIndex,
      }),
    )
  })

  window.addEventListener('touchstart', () => {})
})

const xyyx = new Xyyx(colRowData.rowNumber, colRowData.colNumber)
const state = $computed(() => xyyx.board)

watch(
  () => colRowData,
  () => {
    xyyx.reset(colRowData.rowNumber, colRowData.colNumber)
  },
  { deep: true },
)

const resultState = $ref({
  pageNum: 1,
  pageSize: 5,
  displayArrMaxPageNum: 1,
  allResultTotal: 0,
})

let displayBlocks = $shallowRef<number[][][]>([])
const getDisplayBlocks = (pageNum: number) => {
  resultState.pageNum = pageNum
  displayBlocks = filterdResultArr.slice(
    (resultState.pageNum - 1) * resultState.pageSize,
    (resultState.pageNum - 1) * resultState.pageSize + resultState.pageSize,
  )
  // console.log(displayBlocks)
}

let isLoading = $ref(false)
const handleAllResultClick = () => {
  isLoading = true
  setTimeout(() => {
    resultState.allResultTotal = xyyx.computeAllResolution(serialNumberArr)
    filterAllResult()
    isLoading = false
  }, 500)
}

let filterdResultArr = $shallowRef<number[][][]>([])

const filterAllResult = () => {
  filterdResultArr = []
  if (!xyyx.allResult.length) {
    return
  }
  const requiredArr = requiredBlockIndex.filter(n => n !== -2)
  if (!requiredArr.length) {
    filterdResultArr = xyyx.allResult
    resultState.displayArrMaxPageNum = Math.ceil(filterdResultArr.length / resultState.pageSize)
    getDisplayBlocks(1)
    return
  }
  xyyx.allResult.forEach(item => {
    const flatArr = item.flat()
    // console.log(flatArr, requiredArr)

    if (requiredArr.every(n => flatArr.includes(n))) {
      filterdResultArr.push(item)
    }
  })
  resultState.displayArrMaxPageNum = Math.ceil(filterdResultArr.length / resultState.pageSize)
  getDisplayBlocks(1)
  // console.log(filterdResultArr.length)
}
</script>

<template>
  <NLayout embedded style="height: 100%; overflow: hidden" :native-scrollbar="false">
    <NLayoutHeader style="height: 64px; z-index: 1" position="absolute">
      <Header></Header>
    </NLayoutHeader>
    <NLayoutContent
      embedded
      content-style="padding-top: 64px;"
      position="absolute"
      :native-scrollbar="false"
    >
      <div class="w-80% m-x-auto" lt-sm="w-98%">
        <div class="mt-4">
          <NAlert class="mb-4" title="这只是个稍微美化过的版本" type="warning" closable>
            算法均来自以下两个项目，感谢大佬们的付出
            <br />
            B站主页：
            <NText
              type="info"
              :underline="false"
              tag="a"
              href="https://space.bilibili.com/277401945"
              target="_blank"
              >方形的块状代码</NText
            >
            |
            <NText
              type="info"
              :underline="false"
              tag="a"
              href="https://space.bilibili.com/3461574379441117"
              target="_blank"
              >届不到的光晕</NText
            >
            <br />
            代码仓库：
            <NText
              type="info"
              :underline="false"
              tag="a"
              href="https://github.com/CmdBlockZQG/cbjq"
              target="_blank"
              >CmdBlockZQG</NText
            >
            |
            <NText
              type="info"
              :underline="false"
              tag="a"
              href="https://github.com/halozhy/cbjq"
              target="_blank"
              >halozhy</NText
            >
          </NAlert>
          <NForm label-placement="left">
            <NGrid>
              <NFormItemGi :span="12" label="行数">
                <NInputNumber v-model:value="colRowData.rowNumber"></NInputNumber>
              </NFormItemGi>
              <NFormItemGi :span="12" label="列数">
                <NInputNumber v-model:value="colRowData.colNumber"></NInputNumber>
              </NFormItemGi>
            </NGrid>
          </NForm>
          <NGrid responsive="screen" cols="6 xs:2 s:3 m:4 xl:5 xxl:6" :x-gap="4" :y-gap="4">
            <NGridItem v-for="(_, index) in serialNumberArr" :key="index">
              <NInputNumber v-model:value="serialNumberArr[index]" :min="0">
                <template #prefix>
                  <div
                    class="h-70% mr-20% bg-op-10 p-x-10px flex-center"
                    text="shadow"
                    :style="{ backgroundColor: numberColorDict[index + 1] }"
                  >
                    方块{{ index + 1 }}
                  </div>
                </template>
                <template #suffix>
                  <NCheckbox
                    v-model:checked="requiredBlockIndex[index]"
                    :checked-value="index + 1"
                    :unchecked-value="-2"
                    @update:checked="filterAllResult"
                  ></NCheckbox>
                </template>
              </NInputNumber>
            </NGridItem>
            <NGridItem>
              <NButton :loading="isLoading" type="primary" @click="handleAllResultClick"
                >计算完美结果</NButton
              >
            </NGridItem>
          </NGrid>
        </div>
        <div class="min-w-200px min-h-200px m-y-4">
          <div v-for="(row, y) in state" :key="y" class="flex-center">
            <Block
              v-for="(block, x) in row"
              :key="x"
              :block
              @click="xyyx.onClick(block, x, y)"
            ></Block>
          </div>
        </div>
        <NAlert
          :title="`所有方案数量：${resultState.allResultTotal}，已筛选方案数量：${filterdResultArr.length}`"
          type="info"
        >
          方块数量后面打勾可设定此种方块为必选
          <br />
          最多计算 10000
          种方案，必选方块也是从这里面筛选，所以会存在必选方案覆盖不到的情况，可以适量减少方块的数量
        </NAlert>
        <div class="w-50% m-x-auto m-y-4" lt-sm="w-full" flex="~ justify-around items-center">
          <NButton
            type="info"
            strong
            secondary
            :disabled="resultState.pageNum === 1"
            @click="getDisplayBlocks(resultState.pageNum - 1)"
          >
            上一批
          </NButton>
          <NButton
            type="error"
            strong
            secondary
            :disabled="resultState.pageNum === resultState.displayArrMaxPageNum"
            @click="getDisplayBlocks(resultState.pageNum + 1)"
          >
            下一批
          </NButton>
        </div>
        <div flex="~ wrap lt-sm:justify-between">
          <div
            v-for="(item, itemIndex) in displayBlocks"
            :key="itemIndex"
            class="m-x-10px m-y-10px"
          >
            <div v-for="(row, y) in item" :key="y" class="flex-center">
              <Block v-for="(block, x) in row" :key="x" :block></Block>
            </div>
          </div>
        </div>
      </div>
      <div class="text-14px text-center">
        <a
          href="https://space.bilibili.com/23598218"
          target="_blank"
          class="no-underline"
          style="color: var(--n-title-text-color)"
          >Powerd by 归墟丶 with ♥</a
        >
      </div>
    </NLayoutContent>
  </NLayout>
</template>
