import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {SearchCommonVO} from '../../../core/services/types';
import {ActionCode} from '../../../configs/actionCode';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkbenchComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }



  ngOnInit(): void {
  }
}
