import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  getUkAriticles() {
    return this.historiesUk;
  }
  getEnAriticles() {
    return this.historiesEn;
  }

  getUkAriticleBySlug(slug: string) {
    const res = this.historiesUk.find(article => article.slug === slug);
    if (!res) {
      return null;
    } else {
      return res;
    }
  }
  getEnAriticleBySlug(slug: string) {
    const res = this.historiesEn.find(article => article.slug === slug);
    if (!res) {
      return null;
    } else {
      return res;
    }
  }
  private historiesEn: Partial<Article>[] = [
    {
      title: 'The Story of Seabass',
      updatedAt: '2025-11-10',
      slug: 'sibas-2025-11-10',
      shortContent:
        'Seabass is a little cat from the Kherson region. He was found after shelling, lying under brick debris near a destroyed house, trembling and quietly meowing. His owner was gone, and for several days the kitten did not leave the place where he had last seen them. We rescued him, fed him by hand, and treated his wounds. At first, he was afraid even of the sound of a car engine, but over time he began to trust again, purr, and come into human arms. Today, Seabass is the beloved pet of a new family. He plays again, sleeps peacefully on the couch, and believes in people once more.',
      image:
        'https://i.pinimg.com/1200x/01/bb/3e/01bb3ee009f986c81541a017251eee9f.jpg',
    },
    {
      title: 'The Story of Mira',
      updatedAt: '2025-09-07',
      slug: 'mira-2025-09-07',
      shortContent:
        'Mira was evacuated under shelling. Exhausted, freezing, covered in mud and thorns, she stood in an abandoned shed on the outskirts of an occupied village, with an injured paw, a chain instead of a leash, and nothing but fear in her eyes. After long treatment and months of care and recovery, her photo was seen by a German family — farmers from a small picturesque village in Bavaria. They said: “We are not looking for a purebred dog; we want to give a home to the one who needs it most right now.” Today, Mira is safe, living in a loving and caring family.',
      image:
        'https://i.pinimg.com/1200x/ae/cc/69/aecc69202a906dad9a65be6f1fd1dc0d.jpg',
    },
    {
      title: 'The Story of Bruno',
      updatedAt: '2025-08-19',
      slug: 'bruno-2025-08-19',
      shortContent:
        'Bruno was found on the side of a highway after a night of shelling. He sat pressed against a tree damaged by an explosion and did not try to run away — only looked at people with big, tired eyes. The dog was severely exhausted, with an injured back and marks of an old chain around his neck. During the first weeks, he was afraid of sudden movements and loud sounds, shivering at every door slam. Thanks to treatment, care from volunteers, and patience, Bruno gradually began to trust again. Today, he lives in a private house near Kyiv, enjoys long walks across the fields, and greets his family every morning, wagging his tail with joy.',
      image:
        'https://i.pinimg.com/736x/d8/7a/ae/d87aae3e0a0cbf1fb08dad3047f8cb6c.jpg',
    },
    {
      title: 'The Story of Luna',
      updatedAt: '2025-06-02',
      slug: 'luna-2025-06-02',
      shortContent:
        'Luna was found in the basement of an apartment building, where she spent several weeks with her kittens without light, water, or proper food. The cat was exhausted but protected her babies until the very end, not allowing anyone to come close. After evacuation and veterinary examinations, Luna was finally able to relax. The kittens were quickly adopted, and Luna herself waited a long time for her person. She turned out to be very gentle and calm, loving silence and sunny windowsills. Today, Luna lives in an apartment in Lviv, where she has become the true mistress of the home and a favorite of the entire family.',
      image:
        'https://i.pinimg.com/1200x/e7/85/70/e7857019d739481e38e85381a5385b44.jpg',
    },
    {
      title: 'The Story of Rex',
      updatedAt: '2025-05-11',
      slug: 'rex-2025-05-11',
      shortContent:
        'Rex was evacuated from a frontline village, where he survived on his own for several months near the destroyed home of his owners. The dog guarded the yard as if waiting for the people to return at any moment. He was thin, with injured paws and severe exhaustion. At first, Rex did not allow anyone to touch him, but he never showed aggression. Over time, he began to recognize the voices of volunteers and came out to meet them. After rehabilitation, Rex was adopted by a family from Cherkasy. Now he has a home again, a warm kennel, and people he loyally serves.',
      image:
        'https://i.pinimg.com/1200x/cd/39/14/cd3914aa818f176045825cfd272eba84.jpg',
    },
    {
      title: 'The Story of Sonia',
      updatedAt: '2025-04-18',
      slug: 'sonia-2025-04-18',
      shortContent:
        'Sonia was found near a public transport stop — small, trembling, and completely lost. She ran up to every person, hoping to find protection. The dog was frightened but extremely affectionate, as if she knew that help was close. After veterinary examinations, it became clear that Sonia had lived on the streets for a long time. Volunteers helped her recover and learn to trust the world again. Today, Sonia lives with a young couple, accompanies them on their travels, and rejoices in every new day that no longer begins with fear.',
      image:
        'https://i.pinimg.com/1200x/c1/a0/4c/c1a04c34c5428ec57ff177d7a93b4f51.jpg',
    },
  ];

  private historiesUk: Partial<Article>[] = [
    {
      title: 'Історія Сібаса',
      updatedAt: '2025-11-10',
      slug: 'sibas-2025-11-10',
      shortContent:
        'Сібас - котик з Херсонської області. Малюка знайшли після обстрілу - він лежав під уламками цегли біля зруйнованого будинку, тремтів і тихо нявчав. Його господаря нестало, і ще кілька днів тваринка не відходила від місця, де востаннє його бачив. Ми витягли його , годували з рук, лікували рани. Спочатку він боявся навіть звуку мотору авто, але з часом почав довіряти, муркотіти та іти на ручки.  Сьогодні Сібас - улюбленець нової родини. Він знову грається, спокійно спить на дивані та вірить людям.',
      image:
        'https://i.pinimg.com/1200x/01/bb/3e/01bb3ee009f986c81541a017251eee9f.jpg',
    },
    {
      title: 'Історія Міри',
      updatedAt: '2025-09-07',
      slug: 'mira-2025-09-07',
      shortContent:
        'Міру вивезли під обстрілами. Виснажена, замерзша, вся в болоті і колючках, вона стояла в занедбаному сараї на околиці окупованого села, з пораненою лапою, ланцюгом замість повідка і в очах — лише страх. Після тривалого лікування, кількох місяців турботи й відновлення, її фото побачила німецька родина — фермери з невеликого мальовничого селища в Баварії. Вони сказали: «Ми не шукаємо породистої собаки, ми хочемо подарувати дім тій, хто потребує в даний момент його найбільше». Сьогодні Міра в безпеці , в люблячій і турботливій сім’ї .',
      image:
        'https://i.pinimg.com/1200x/ae/cc/69/aecc69202a906dad9a65be6f1fd1dc0d.jpg',
    },
    {
      title: 'Історія Бруно',
      updatedAt: '2025-08-19',
      slug: 'bruno-2025-08-19',
      shortContent:
        'Бруно знайшли на узбіччі траси після нічного обстрілу. Він сидів, притискаючись до понівеченого від вибуху дерева, і не намагався тікати — лише дивився на людей великими, втомленими очима. Пес був сильно виснажений, з пораненою спиною та слідами старого ланцюга на шиї. Перші тижні він боявся різких рухів і гучних звуків, здригався від кожного хлопка дверей. Завдяки лікуванню, турботі волонтерів і терпінню, Бруно поступово почав довіряти. Сьогодні він живе у приватному будинку під Києвом, любить довгі прогулянки полями та щоранку зустрічає свою сім’ю, радісно махаючи хвостом.',
      image:
        'https://i.pinimg.com/736x/d8/7a/ae/d87aae3e0a0cbf1fb08dad3047f8cb6c.jpg',
    },
    {
      title: 'Історія Луни',
      updatedAt: '2025-06-02',
      slug: 'luna-2025-06-02',
      shortContent:
        'Луну знайшли у підвалі багатоповерхівки, де вона провела кілька тижнів разом із кошенятами без світла, води та нормальної їжі. Кішка була виснажена, але до останнього оберігала своїх малюків, не підпускаючи нікого близько. Після евакуації та огляду ветеринарів Луна нарешті змогла розслабитися. Кошенят швидко прилаштували, а сама Луна довго чекала на свою людину. Вона виявилася дуже ніжною і спокійною, любила тишу та сонячні підвіконня. Зараз Луна живе у квартирі в Львові, де стала справжньою господинею дому і улюбленицею всієї родини.',
      image:
        'https://i.pinimg.com/1200x/e7/85/70/e7857019d739481e38e85381a5385b44.jpg',
    },
    {
      title: 'Історія Рекса',
      updatedAt: '2025-05-11',
      slug: 'rex-2025-05-11',
      shortContent:
        'Рекса евакуювали з прифронтового села, де він кілька місяців самотужки виживав біля зруйнованого будинку своїх господарів. Пес охороняв подвір’я, ніби чекав, що люди ось-ось повернуться. Він був худий, з пораненими лапами та сильним виснаженням. Перший час Рекс не дозволяв себе торкатися, але ніколи не проявляв агресії. З часом він почав впізнавати голоси волонтерів і виходив назустріч. Після реабілітації Рекса забрала родина з Черкас. Тепер він знову має дім, теплу будку і людей, яким віддано служить.',
      image:
        'https://i.pinimg.com/1200x/cd/39/14/cd3914aa818f176045825cfd272eba84.jpg',
    },
    {
      title: 'Історія Соні',
      updatedAt: '2025-04-18',
      slug: 'sonia-2025-04-18',
      shortContent:
        'Соню знайшли біля зупинки громадського транспорту — маленьку, тремтячу і зовсім розгублену. Вона підбігала до кожної людини, сподіваючись знайти захист. Собака була налякана, але надзвичайно контактна, ніби знала, що порятунок поруч. Після огляду ветеринарів з’ясувалося, що Соня давно жила на вулиці. Волонтери допомогли їй відновитися, навчили знову довіряти світу. Сьогодні Соня живе у молодої пари, супроводжує їх у подорожах і щоразу радіє новому дню, який більше не починається зі страху.',
      image:
        'https://i.pinimg.com/1200x/c1/a0/4c/c1a04c34c5428ec57ff177d7a93b4f51.jpg',
    },
  ];
}
