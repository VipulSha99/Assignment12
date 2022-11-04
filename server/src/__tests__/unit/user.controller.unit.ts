import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UserRepository} from '../../repositories';
import {UserController} from '../../controllers';
import {User} from '../../models';
import { JwtService } from '../../services/jwt.service';
import { BcryptHasher } from '../../services/hash.password.bcrypt';

describe('UserController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<UserRepository>;
  let jwtService: StubbedInstanceWithSinonAccessor<JwtService>;
  let bcryptHasher: StubbedInstanceWithSinonAccessor<BcryptHasher>;
  beforeEach(givenStubbedRepository);
  beforeEach(givenStubbedjwtService);
  beforeEach(givenStubbedBcryptHasher);

  const fetchedUsers = [
    new User({
      id: 'uuid1',
      firstName: 'Leo',
      middleName: 'GOAT',
      lastName: 'Messi',
      address: 'Argentina',
      email: 'lm10@goat.com',
      phoneNumber: 10303010,
      createdAt: new Date('1986-09-13T04:16:36.382Z'),
      rolekey: 'dasdsa',
      customerId: 'dsadsa',
      username: 'vipul',
      password: 'vipul123'
    }),
    new User({
      id: 'uuid2',
      firstName: 'qwerty',
      middleName: 'GOAT',
      lastName: 'Messi',
      address: 'Argentina',
      email: 'lm10@goat.com',
      phoneNumber: 10303010,
      createdAt: new Date('1987-09-13T04:16:36.382Z'),
      rolekey: 'dasdsa',
      customerId: 'dsadsa',
      username: 'akash',
      password: 'akash123'
    }),
  ];

    it('fetches all the users', async () => {
      const controller = new UserController(repository,jwtService,bcryptHasher);
      repository.stubs.find.resolves(fetchedUsers);

      const users = await controller.find();

      expect(users).to.deepEqual(fetchedUsers);
      sinon.assert.calledWithMatch(repository.stubs.find);
    });

    it('deletes the user with the given id', async () => {
      const controller = new UserController(repository,jwtService,bcryptHasher);
      await controller.deleteById('uuid1');
      sinon.assert.calledWithMatch(repository.stubs.deleteById, 'uuid1');
    });

    it('get selected user with the given id',async ()=>{
      const controller = new UserController(repository,jwtService,bcryptHasher);
      const userSelected =new User({
        id: 'uuid1',
        firstName: 'Leo',
        middleName: 'GOAT',
        lastName: 'Messi',
        address: 'Argentina',
        email: 'lm10@goat.com',
        phoneNumber: 10303010,
        createdAt: new Date('1986-09-13T04:16:36.382Z'),
        rolekey: 'dasdsa',
        customerId: 'dsadsa',
        username: 'vipul',
        password: 'vipul123'
      });
      repository.stubs.find.resolves(fetchedUsers);
      const selectedUser = await controller.findById('uuid1');
      expect(selectedUser).to.deepEqual(userSelected);
      sinon.assert.calledWithMatch(repository.stubs.find);

    });

    it('edit selected user with the given id',async ()=>{
      const controller = new UserController(repository,jwtService,bcryptHasher);
      const userData =new User({
        id: 'uuid1',
        firstName: 'vipul',
        middleName: 'GOAT',
        lastName: 'Sharma',
        address: 'Argentina',
        email: 'lm10@goat.com',
        phoneNumber: 10303010,
        createdAt: new Date('1986-09-13T04:16:36.382Z'),
        rolekey: 'dasdsa',
        customerId: 'dsadsa',
        username: 'vipul',
        password: 'vipul123'
      });
      await controller.updateById('uuid1',userData);
      sinon.assert.calledWithMatch(repository.stubs.updateById, 'uuid1');
    });

    it('adding a new user',async ()=>{
      const controller = new UserController(repository,jwtService,bcryptHasher);
      const userData =new User({
        firstName: 'vinayak',
        middleName: 'GOAT',
        lastName: 'Gupta',
        address: 'India',
        email: 'vg@gmail.com',
        phoneNumber: 10303010,
        createdAt: new Date('1986-09-13T04:16:36.382Z'),
        updatedAt: new Date('1986-09-13T04:16:36.382Z'),
        rolekey: 'dasdsa',
        customerId: 'dsadsa',
        username: 'vinayak',
        password: 'vinayak123'
      });
      await controller.create(userData);
      sinon.assert.calledWithMatch(repository.stubs.create);
    });


  function givenStubbedRepository() {
    repository = createStubInstance(UserRepository);
  }
  function givenStubbedjwtService() {
    jwtService = createStubInstance(JwtService);
  }
  function givenStubbedBcryptHasher() {
    bcryptHasher = createStubInstance(BcryptHasher);
  }
});
