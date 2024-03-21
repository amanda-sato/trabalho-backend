import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dia, DiaRelations, Tarefa} from '../models';
import {TarefaRepository} from './tarefa.repository';

export class DiaRepository extends DefaultCrudRepository<
  Dia,
  typeof Dia.prototype.id,
  DiaRelations
> {

  public readonly tarefas: HasManyRepositoryFactory<Tarefa, typeof Dia.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TarefaRepository') protected tarefaRepositoryGetter: Getter<TarefaRepository>,
  ) {
    super(Dia, dataSource);
    this.tarefas = this.createHasManyRepositoryFactoryFor('tarefas', tarefaRepositoryGetter,);
    this.registerInclusionResolver('tarefas', this.tarefas.inclusionResolver);
  }
}
