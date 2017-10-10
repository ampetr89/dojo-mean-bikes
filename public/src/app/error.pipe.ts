import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:'error'
})
export class ErrorPipe implements PipeTransform{
  transform(err: Object, name: String = "This field"){
    let title_name = name[0].toUpperCase() + name.slice(1);
    name = name.toLowerCase();

    //console.log('error pipe got', err)
    if(err === null){
      return ''
    }
    if(Object.keys(err).length==0){
      return '';
    }
    let msg: Array<string>= [];
    if(err['required']){
      msg.push(`${title_name} is required.`);
    }
    if(err['pattern']){
      msg.push(`Invalid format for ${name}.`);
    }
    if(err['minlength']){
      let min_chars = err['minlength']['requiredLength'];
      msg.push(`${title_name} must be at least ${min_chars} characters long.`);
    }
    return msg.join(' ');

  }

}
