import { Button, Heading, HStack, Text } from "native-base";
import React from "react";
import { Screen, GitHubButton } from "../components";
import { useTheme } from "../hooks";

export const Home: React.FC<unknown> = () => {
  const { toggleTheme } = useTheme();
  return (
    <Screen paddingX='4' paddingY='6'>
      <HStack>
        <GitHubButton />
      </HStack>
      <Heading size='2xl'>Hamburger Boilerplate App</Heading>
      <Heading size='sm' paddingY='2'>
        This App lives in the @hamburger/meat package
      </Heading>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, vel quos
        dolor iusto mollitia suscipit illum dolore ipsa quasi explicabo sint
        nesciunt quia? Nobis maxime, doloremque fuga expedita similique
        praesentium. Fugit accusamus iusto eveniet saepe, voluptates, veniam aut
        quis praesentium eos quae ipsam vel omnis deserunt voluptatum totam
        fugiat laborum reiciendis necessitatibus incidunt? Temporibus
        perspiciatis quidem fugit, corrupti aspernatur vero. Odio iusto fuga
        nesciunt sed consequatur aliquam assumenda aperiam natus recusandae
        incidunt. Blanditiis, accusamus voluptatibus. Quod, tempora saepe ipsum
        veritatis optio voluptatibus tempore laboriosam. Esse a dignissimos
        neque earum quidem. Temporibus voluptatem expedita aperiam iure velit
        ipsa fugit corporis iste quibusdam, deleniti aliquid. Delectus, labore?
        Illo cum amet omnis impedit vero et nemo qui tempore natus, praesentium,
        nam ipsa? Minima. Modi maiores aliquam magnam aperiam deleniti tempore
        facere, atque aliquid eveniet quam cumque pariatur distinctio dicta
        nihil illum fugiat commodi sapiente magni repellat iusto consequuntur
        exercitationem a cupiditate omnis. Aspernatur.
      </Text>
      <Button background='darkBlue.400' my='4' py='4' onPress={toggleTheme}>
        Change Theme
      </Button>
      <Heading size='sm' paddingY='2'>
        You seem to like reading 😜
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nulla
        animi, eum aspernatur incidunt cumque obcaecati natus neque delectus
        accusantium quidem! Ducimus amet nihil animi fugiat veritatis
        necessitatibus quis doloribus quod nesciunt, maxime quam recusandae. Ea
        iure temporibus magnam eius ipsam fugit labore voluptatum cupiditate
        quisquam consequatur nemo voluptatibus cum perferendis, non repellat
        libero obcaecati assumenda consequuntur amet expedita cumque illo
        necessitatibus voluptas et? Ullam officia laboriosam voluptatibus earum,
        voluptatem modi sunt alias perspiciatis consequatur deserunt, enim
        necessitatibus minima totam. Quidem aliquid, culpa aspernatur ducimus
        nobis ad beatae est alias architecto illo quod dolore expedita a
        incidunt tenetur possimus atque inventore itaque. Necessitatibus,
        ratione rem placeat officia reprehenderit molestiae animi optio expedita
        eligendi voluptatibus vitae numquam est tenetur nesciunt saepe
        asperiores modi maiores accusamus recusandae assumenda qui, rerum
        corporis minus? Ipsum beatae repellat dolor reiciendis doloremque magni,
        praesentium repellendus ratione sequi eum pariatur quo iste temporibus
        earum consequatur expedita eius! Incidunt sit libero ab voluptates
        asperiores praesentium autem, consequuntur perferendis. Soluta voluptate
        natus repudiandae id quam. Soluta fugit magni quia, numquam facere
        incidunt eius rerum iste voluptate iure nostrum est, hic, at voluptates
        ex placeat tempore amet porro maiores error in reiciendis quod inventore
        aliquid! Maiores iusto quasi exercitationem sed!
      </Text>
    </Screen>
  );
};
