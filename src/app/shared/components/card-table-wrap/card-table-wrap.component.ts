import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NzTableSize} from "ng-zorro-antd/table";
import {AntTableComponentToken, TableHeader} from "../ant-table/ant-table.component";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {AntTreeTableComponentToken} from "@shared/components/tree-table/tree-table.component";

interface TableSizeItem {
  sizeName: string,
  selected: boolean,
  value: NzTableSize,
}


@Component({
  selector: 'app-card-table-wrap',
  templateUrl: './card-table-wrap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTableWrapComponent implements OnInit, AfterContentInit {
  @Input() tableTitle: string | TemplateRef<NzSafeAny> | undefined;
  @Input() btnTpl: TemplateRef<NzSafeAny> | undefined;
  @Input() isNormalTable = true; // 如果只是需要card-table-wrap的样式，这里设置为false
  @Output() reload = new EventEmitter<NzSafeAny>();
  @ContentChild(AntTableComponentToken) antTableComponent!: AntTableComponentToken;
  @ContentChild(AntTreeTableComponentToken) antTreeTableComponent!: AntTreeTableComponentToken;
  tableConfigVisible = false;
  tableSizeOptions: TableSizeItem[] = [
    {sizeName: '默认', selected: true, value: "default"},
    {sizeName: '中等', selected: false, value: "middle"},
    {sizeName: '紧凑', selected: false, value: "small"},
  ];
  tableHeaders: TableHeader[] = [];
  currentTableComponent!: AntTableComponentToken | AntTreeTableComponentToken;
  allTableFieldChecked = false;  // 设置里面全选列
  allTableFieldIndeterminate = false; // 设置里面全选列的半选状态
  copyHeader: TableHeader[] = [];  // 缓存默认配置


  constructor() {
  }

  // 是否展示复选框
  changeTableCheckBoxShow(e: boolean): void {
    this.currentTableComponent.tableConfig.showCheckbox = e;
    this.tableChangeDectction();
  }

  // 大中小表格密度
  tableSizeMenuClick(item: TableSizeItem): void {
    this.tableSizeOptions.forEach(tableSizeItem => tableSizeItem.selected = false);
    item.selected = true;
    this.currentTableComponent.tableSize = item.value;
  }

  // 配置中tableCheckbox是否全选
  changeAllTableTableConfigShow(e: boolean): void {
    if (e) {
      this.allTableFieldChecked = e;
      this.allTableFieldIndeterminate = false;
    }
    this.tableHeaders.forEach(item => item.show = e);
    this.tableChangeDectction();
  }

  // 设置固定左侧还是右侧
  changeTableConfigShow(): void {
    const tempArray = [...this.tableHeaders];
    const fixedLeftArray: TableHeader[] = [];
    const fixedRightArray: TableHeader[] = [];
    const noFixedArray: TableHeader[] = [];
    tempArray.forEach(item => {
      if (item.fixed) {
        if (item.fixedDir === "left") {
          fixedLeftArray.push(item);
        } else {
          fixedRightArray.push(item)
        }
      } else {
        noFixedArray.push(item)
      }
    });
    this.currentTableComponent.tableConfig.headers = [...fixedLeftArray, ...noFixedArray, ...fixedRightArray];
    this.tableChangeDectction();
  }

  dropTableConfig(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tableHeaders, event.previousIndex, event.currentIndex);
    this.changeTableConfigShow();
  }

  fixedTableHead(dir: 'right' | 'left', item: TableHeader): void {
    item.fixed = !(item.fixed && item.fixedDir === dir);
    item.fixedDir = dir;
    this.changeTableConfigShow();
  }

  reloadClick(): void {
    this.reload.emit();
  }

  // 某一列check变化
  changeSignalCheck(e: boolean, item: TableHeader): void {
    item.show = e;
    this.judgeAllChecked();
    this.tableChangeDectction();
  }

  // 使子列表变更检测
  tableChangeDectction() {
    this.currentTableComponent.tableChangeDectction();
  }

  // 判断列展示这个checkbox的状态
  judgeAllChecked(): void {
    this.allTableFieldChecked = this.tableHeaders.every(item => item.show === true);
    const allUnChecked = this.tableHeaders.every(item => !item.show);
    this.allTableFieldIndeterminate = !this.allTableFieldChecked && !allUnChecked;
  }

  // 重置
  reset(): void {
    this.tableHeaders = [];
    this.copyHeader.forEach(item => {
      this.tableHeaders.push({...item});
    })
    this.currentTableComponent.tableConfig.headers = [...this.tableHeaders];
    this.tableChangeDectction();
  }


  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.currentTableComponent = this.antTableComponent || this.antTreeTableComponent;

    if (this.isNormalTable) {
      this.tableHeaders = [...this.currentTableComponent.tableConfig.headers];
      this.tableHeaders.forEach(item => {
        if (item.show === undefined) {
          item.show = true;
        }
      })
      this.copyHeader.length = 0;
      this.tableHeaders.forEach(item => {
        this.copyHeader.push({...item});
      })
      this.judgeAllChecked();
    }
  }

}
