import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tarefa, TarefaRelations, Dia} from '../models';
import {DiaRepository} from './dia.repository';

export class TarefaRepository extends DefaultCrudRepository<
  Tarefa,
  typeof Tarefa.prototype.id,
  TarefaRelations
> {

  public readonly dia: BelongsToAccessor<Dia, typeof Tarefa.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DiaRepository') protected diaRepositoryGetter: Getter<DiaRepository>,
  ) {
    super(Tarefa, dataSource);
    this.dia = this.createBelongsToAccessorFor('dia', diaRepositoryGetter,);
    this.registerInclusionResolver('dia', this.dia.inclusionResolver);
  }
}
