import { TestBed, async } from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { FormComponent } from './Form';

import { FormsModule } from '@angular/forms';
import { ListProvider } from './ListProvider';

describe('Form', () => {
  
  let component;
  let compiled;
  let fixture;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
      imports: [
        FormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        ListProvider
      ],
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });
  
  describe('on instance', () => {
    it('should defined variables', () => {
      expect(component.title).toBe('Todo List');
      expect(component.newTask).toBe('');
      expect(component.listProvider).toBeDefined();
    });

    it('should render title in a h1 tag', async(() => {    
      expect(compiled.querySelector('h2').textContent).toContain('Todo List');
    }));

    it('should bindng input value', async(() => {    
      const input = compiled.querySelector('input');
      input.value = 'newTask';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.newTask).toBe('newTask');
    }));
    
    it('should render mat-card length', async(() => {    
      component.listProvider.tasks = [
        {value: 'task1', activate: false },
        {value: 'task2', activate: false }
      ];
      
      fixture.detectChanges();
      
      expect(compiled.querySelectorAll('mat-card').length).toBe(2);
      expect(compiled.querySelectorAll('mat-card-title')[0].textContent).toBe('Tarea 1');
      expect(compiled.querySelectorAll('mat-card-subtitle')[0].textContent).toContain('task1');
      
      expect(compiled.querySelectorAll('mat-card-title')[1].textContent).toBe('Tarea 2');
      expect(compiled.querySelectorAll('mat-card-subtitle')[1].textContent).toContain('task2');
      
      expect(compiled.querySelectorAll('mat-card-subtitle > mat-form-field').length).toBe(0);
    }));
    
    it('should render input when activated', async(() => {    
      component.listProvider.tasks = [
        {value: 'task1', activate: true },
        {value: 'task2', activate: false }
      ];
      
      fixture.detectChanges();
      
      expect(compiled.querySelectorAll('mat-card-subtitle > span').length).toBe(1);
      expect(compiled.querySelectorAll('mat-card-subtitle > mat-form-field').length).toBe(1);
      expect(compiled.querySelectorAll('mat-card-header > div > div > button > i')[0].className).toBe('fa fa-check');
    }));
  });
  
  describe('when crud taks', () => {
    it('should called provider.addTask', async(() => {
      spyOn(component.listProvider, 'addTask');
      component.newTask = 'cleanScope';
      
      component.add('task');

      expect(component.listProvider.addTask).toHaveBeenCalledWith('task');
      expect(component.newTask).toBe('');
    }));
    
    it('should called provider.editTask', async(() => {
      spyOn(component.listProvider, 'editTask');
      component.edit(1, {value: 'editTask'});

      expect(component.listProvider.editTask).toHaveBeenCalledWith(1, {value: 'editTask', activate: true});
    }));
    
    it('should called provider.removeTask', async(() => {
      spyOn(component.listProvider, 'removeTask');
      component.remove('indexTask');

      expect(component.listProvider.removeTask).toHaveBeenCalledWith('indexTask');
    }));
  });
});
