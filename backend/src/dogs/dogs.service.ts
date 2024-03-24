import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Web3 from 'web3';

import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dto';
import { abi } from '../contracts/Dog.json';
import { address } from '../contracts/Dog-address.json';

@Injectable()
export class DogsService {
  private dogs: Dog[] = [];

  create(createDogDto: CreateDogDto) {
    const dog = new Dog(
      uuid(),
      createDogDto.name,
      createDogDto.alias,
      createDogDto.breed,
      createDogDto.color,
      true,
    );

    this.dogs.push(dog);

    return dog;
  }

  findAll() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545')
    );

    const contract = new web3.eth.Contract(abi, address);

    async function interactWithContract() {
      try {
        const result = await contract.methods.name().call();
        console.log('Resultado:', result);
      } catch (error) {
        console.error('Error al interactuar con el contrato:', error);
      }
    }

    interactWithContract();

    return this.dogs;
  }

  /*async getBalance() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );

    const balance = await web3.eth.getBalance('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    return balance;
  }*/

  findOne(id: string) {
    const dog = this.dogs.find(dog => dog.id === id);
    if (!dog) throw new NotFoundException(`Dog with id '${id}' not found`);

    return dog;
  }

  /*adopt(id: number) {
    return `This action adopt a #${id} dog`;
  }*/
}
