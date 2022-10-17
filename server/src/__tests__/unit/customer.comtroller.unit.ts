import { createStubInstance, expect, sinon, StubbedInstanceWithSinonAccessor } from "@loopback/testlab";
import { CustomersController } from "../../controllers";
import { Customer } from "../../models";
import { CustomerRepository } from "../../repositories";

describe('CustomerController (unit)', () => {
    let repository: StubbedInstanceWithSinonAccessor<CustomerRepository>;
    beforeEach(givenStubbedRepository);

    const fetchedCustomers = [
        new Customer({
          id:'uuid11',
          name:'Alex',
          website:'www.alex.com',
          address:'America',
          createdAt: new Date('1986-09-13T04:16:36.382Z')
        }),
    ]

    it('fetches all the customer', async () => {
        const controller = new CustomersController(repository);
  
        repository.stubs.find.resolves(fetchedCustomers);
  
        const customers = await controller.find();
  
        expect(customers).to.deepEqual(fetchedCustomers);
        sinon.assert.calledWithMatch(repository.stubs.find);
      });
  
      it('deletes the customer with the given id', async () => {
        const controller = new CustomersController(repository);
        await controller.deleteById('uuid11');
        sinon.assert.calledWithMatch(repository.stubs.deleteById, 'uuid11');
      });
  
      it('get selected customer with the given id',async ()=>{
        const controller = new CustomersController(repository);
        const CustomerSelected =new Customer({
            id:'uuid11',
            name:'Alex',
            website:'www.alex.com',
            address:'America',
            createdAt: new Date('1986-09-13T04:16:36.382Z')
          });
        repository.stubs.find.resolves(fetchedCustomers);
        const customer = await controller.findById('uuid11');
        expect(customer).to.deepEqual(CustomerSelected);
        sinon.assert.calledWithMatch(repository.stubs.find);
  
      });
  
      it('edit selected customer with the given id',async ()=>{
        const controller = new CustomersController(repository);
        const CustomerSelected =new Customer({
            id:'uuid11',
            name:'Alex',
            website:'www.alex1.com',
            address:'America',
            createdAt: new Date('1986-09-13T04:16:36.382Z')
          });
        await controller.updateById('uuid12',CustomerSelected);
        sinon.assert.calledWithMatch(repository.stubs.updateById, 'uuid12');
      });
  
      it('adding a new customer',async ()=>{
        const controller = new CustomersController(repository);
        const CustomerSelected =new Customer({
            id:'uuid12',
            name:'John',
            website:'www.John.com',
            address:'Australia',
            createdAt: new Date('1988-09-13T04:16:36.382Z')
          });
        await controller.create(CustomerSelected);
        sinon.assert.calledWithMatch(repository.stubs.create);
      });

    function givenStubbedRepository() {
        repository = createStubInstance(CustomerRepository);
    }
});