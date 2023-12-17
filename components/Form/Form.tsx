"use client";

import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Card, rem, Blockquote, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconCross, IconError404, IconX } from '@tabler/icons-react';
import '@mantine/dates/styles.css';
function PreRegisterForm() {
  const [active, setActive] = useState(0);

  const [status,setStatus] = useState<null | number>(null);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState<Date | null>(null);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      surname: '',
      birthday: '',
      phone: '',
      tckn: '',
    },

    validate: (values: any) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? 'Username must include at least 6 characters'
              : null,
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        return {
          name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          email:validateEmail(values),
        };
      }

      if (active === 2) {
        return {
          tckn: values.tckn.trim().length != 11 ? 'TCKN must include 11 characters' : null,
          gsm: values.phone.trim().length != 10 ? 'GSM must include 10 characters' : null,
        }
      }

      return {};
    },
  });

  function validateEmail(values:any) : string | null {
   
    if (!/^\S+@\S+$/.test(values.email)) {
      return "Invalid email"
    } else if (!values.email.endsWith("@ku.edu.tr")) {
      return "You must use your @ku.edu.tr email"
    }
    return null
    
  }

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      if (current+1==3) {
        setLoading(true)
        fetch("http://localhost:11048/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            tckn: form.values.tckn,
            name: form.values.name,
            surname: form.values.surname,
            birth_date: value?.toISOString(),
            email: form.values.email,
            phone: form.values.phone,
            username: form.values.username,
            password: form.values.password
          })
        }).then((response)=>response.json()).then((data)=>{
          console.log(data)
          setStatus(data.status)
          setLoading(false)
        })
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Card m={40}>
      <Stepper active={active}>
        <Stepper.Step label="First step" description="Profile settings">
          <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
          <Group grow>
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
            <TextInput label="Surname" placeholder="Surname" {...form.getInputProps('surname')} />
          </Group>
          
          <Group grow>
          <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
           <DatePickerInput
            leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            leftSectionPointerEvents="none"
            label="Date of Birth"
            placeholder="Date of Birth"
            value={value} onChange={setValue} 
          />
          </Group>
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Validation" color={status != 1 ? 'red' : 'green'} completedIcon={status !=null ? <IconError404/> : null}>
          <TextInput label="TCKN" placeholder="11111111111" {...form.getInputProps('tckn')} />
          <TextInput
            mt="md"
            label="GSM"
            placeholder="5xxxxxxxxx"
            {...form.getInputProps('phone')}
          />
        </Stepper.Step>
        <Stepper.Completed>
          {isLoading ? <Loader/> : status == 1 ? <Blockquote title="Validation" color="green" icon={<IconX/>}>You have successfully registered</Blockquote> : status == 2 ?  <Blockquote title="Validation" color="red" icon={<IconError404/>}>User already registered!</Blockquote> : <Blockquote title="Validation" color="red" icon={<IconError404/>}>TCKN verification failed!</Blockquote> }
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Card>
  );
}

export default PreRegisterForm;