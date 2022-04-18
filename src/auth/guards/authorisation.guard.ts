import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorisationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('get class', this.reflector.get('roles', context.getClass()));
    // console.log('get handler', this.reflector.get('roles', context.getClass()));
    // console.log(
    //   'getAll',
    //   this.reflector.getAll('roles', [context.getClass(), context.getHandler()]),
    // );
    // console.log(
    //   'getAllAndMerge',
    //   this.reflector.getAllAndMerge('roles', [
    //     context.getClass(),
    //     context.getHandler(),
    //   ]),
    // );
    // console.log(
    //   'getAllAndOverride',
    //   this.reflector.getAllAndOverride('roles', [
    //     context.getClass(),
    //     context.getHandler,
    //   ]),
    // );
    const requiredRoles = this.reflector.getAllAndMerge('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    const user = context.switchToHttp().getRequest().user;
    return requiredRoles.includes(user.role);
  }
}
