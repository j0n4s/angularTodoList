import { ListProvider } from './ListProvider';

describe('List provider', () => {
  let provider;

  beforeEach(() => {
     provider = new ListProvider();
  });

  describe('on instance', () => {
    it('should defined variables', () => {
      expect(provider.tasks).toEqual([]);  
    });
  });
  
  it('should add new task', () => {
    provider.addTask('newTask');  
    expect(provider.tasks).toEqual([{value: 'newTask', activate: false}]);
  });
  
  it('should edit task', () => {
    provider.tasks = ['task1', 'task2'];
    provider.editTask(1, 'editTask');  
    
    expect(provider.tasks).toEqual(['task1', 'editTask']);
  });
  
  it('should remove task', () => {
    provider.tasks = ['removeTask', 'task'];
    provider.removeTask(0);  
    
    expect(provider.tasks).toEqual(['task']);
  });
});
