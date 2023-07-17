import collections from "../models/index.collections"
import { ApplicationError } from "./applicationError";
import bcrypt from './bcryptPassword'
import config from 'config'
import { IAlbumCollectionSchema } from "../models/collections/AlbumCollections";
import { Types } from "mongoose";
import { IAlbumSchema } from "../models/collections/Albumes";
import { IFigurineSchema } from "../models/collections/Figurites";

const createMocksDateHandler = async () => {
    try {

        await createRoles()

        await createUserAdmin()

        await createAlbumCollections()

        await createAlbumes()

        await createFigurites()

    } catch (error) {
        throw new ApplicationError({ message: 'Ocurrio un error al crear los datos por default', source: error })
    }
}


export { createMocksDateHandler }


const createRoles = async () => {
    const roles = await collections.Roles.find({});
    if (roles.length === 0) {
        await collections.Roles.insertMany([
            { name: "Admin" },
            { name: "User" }
        ])
    }
}

const createUserAdmin = async () => {
    const userAdmin = await collections.Users.findOne({ email: 'admin@gmail.com' })

    if (userAdmin === null) {
        const roles = await collections.Roles.find({});
        await collections.Users.create({
            email: 'admin@gmail.com',
            fullName: 'Administrador',
            password: await bcrypt.encrypt(config.get("password_admin")),
            roles: [roles[0]._id] // Rol: Admin
        })
    }
}

const createAlbumCollections = async () => {
    const albumCollections = await collections.AlbumCollections.find({})
    if (albumCollections.length === 0) {
        await collections.AlbumCollections.insertMany(listToAlbumCollectionsForCreate)
    }
}

const createAlbumes = async () => {
    const albumes = await collections.Albumes.find({})
    if (albumes.length === 0) {

        const findAlbumCollections = await collections.AlbumCollections.find({})

        /*  - Obtener todas las colecciones
            - Hacer un forEach por cada coleccion y validar a partir del title de la coleccion
               que albumes agregarle
            - Almacenar los id de cada album agregado e insertarlos en albumCollections 
        */
        findAlbumCollections.forEach(async (albumCollection: IAlbumCollectionSchema) => {
            const newListAlbumesForCreate = listAlbumesForCreate[albumCollection.title].map((albumForCreate: any) => {
                return {
                    title: albumForCreate.title,
                    image: albumForCreate.image,
                    albumCollections: new Types.ObjectId(albumCollection._id)
                }
            })

            const insertManyToResult = await collections.Albumes.insertMany(newListAlbumesForCreate)

            const idsToNewsAlbumes = insertManyToResult.map((newAlbum: IAlbumSchema) => {
                return new Types.ObjectId(newAlbum._id)
            })

            await collections.AlbumCollections.findByIdAndUpdate(albumCollection._id, {
                $push: { albumes: { $each: idsToNewsAlbumes } }
            })
        })
    }
}

const createFigurites = async () => {
    const figurites = await collections.Figurites.find({})
    if (figurites.length === 0) {

        const findAlbum = await collections.Albumes.find({})

        findAlbum.forEach(async (album: IAlbumSchema) => {
            const newListFigurineForCreate = figuritesToAlbum[album.title].map((figurineForCreate: any) => {
                return {
                    title: figurineForCreate.title,
                    image: figurineForCreate.image,
                    album: new Types.ObjectId(album._id)
                }
            })
            const insertManyToResult = await collections.Figurites.insertMany(newListFigurineForCreate)

            const idsToNewsFigurites = insertManyToResult.map((newFigurine: IFigurineSchema) => {
                return new Types.ObjectId(newFigurine._id)
            })

            await collections.Albumes.findByIdAndUpdate(album._id, {
                $push: { figurites: { $each: idsToNewsFigurites } }
            })
        })
    }
}

const listToAlbumCollectionsForCreate: any = [
    { title: "Futbol", },
    { title: "Tenis", },
    { title: "Basket", },
    { title: "Rugby", },
    { title: "Disney", },
    { title: "Anime", }
]

const listAlbumesForCreate: any = {
    Futbol: [
        {
            title: "Copa Libertadores",
            image: "https://www.elcomercio.com/wp-content/uploads/2022/10/Liber-COnme-700x391.jpg",
        },
        {
            title: "Champions League",
            image: "https://a.espncdn.com/photo/2021/0913/r908628_1296x729_16-9.jpg",
        },
        {
            title: "Copa America",
            image: "https://auf.org.uy/imagenes/img_contenido/contenido/c/copa-america_5.jpg",
        }
    ],
    Tenis: [
        {
            title: "Wimbledon",
            image: "https://image.shutterstock.com/image-photo/london-uk-april-2022-close-260nw-2165550065.jpg",
        },
        {
            title: "Rollan Garros",
            image: "https://espnpressroom.com/mexico/files/2018/05/Roland-Garros.png",
        },
        {
            title: "Us Open",
            image: "https://brandemia.org/sites/default/files/inline/images/us_open_logo.jpg",
        }
    ],
    Basket: [
        {
            title: "Liga Endesa",
            image: "https://www.unocontraunoweb.com/wp-content/uploads/2021/01/acb-logo-2019.jpg",
        },
        {
            title: "NBA",
            image: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fnba.png",
        },
        {
            title: "La Liga Argentina",
            image: "https://pbs.twimg.com/profile_images/1537068349385068544/OSkcZWlP_400x400.jpg",
        }
    ],
    Rugby: [
        {
            title: "National Rugby League",
            image: "https://searchvectorlogo.com/wp-content/uploads/2020/09/national-rugby-league-nrl-vector-logo.png",
        },
        {
            title: "Super League",
            image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Super_League_logo_2017.jpg",
        },
        {
            title: "The Rugby Championship",
            image: "https://www.prensa-latina.cu/wp-content/uploads/2022/08/Rugby-Championship-2022.jpg",
        }
    ],
    Disney: [
        {
            title: "Monster Inc",
            image: "https://cdn1.eldia.com/112021/1635837451953.jpg",
        },
        {
            title: "Monster University",
            image: "https://ichef.bbci.co.uk/images/ic/1200x675/p0915n36.jpg",
        },
        {
            title: "High school Musical",
            image: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/16E670238DC278CF1FC15F794914B0371708F078C210E01443353314452473E9/scale?width=1200&aspectRatio=1.78&format=jpeg",
        },
        {
            title: "High school Musical 2",
            image: "https://pics.filmaffinity.com/High_School_Musical_2_TV-318249736-mmed.jpg",
        },
        {
            title: "La era del hielo 1",
            image: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/050E5D6C2B62066D3397CD0855B4274A9728186CEE39451C68FAA17A1D8EBB98/scale?width=1200&aspectRatio=1.78&format=jpeg",
        },
        {
            title: "La era del hielo 2",
            image: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/2BDBC39CA1B941A0C4360565C67E8EDB97E2D0904DF11737583ED61E80C7CC07/scale?width=1200&aspectRatio=1.78&format=jpeg",
        },
        {
            title: "La era del hielo 3",
            image: "https://mx.web.img3.acsta.net/c_310_420/pictures/20/10/21/20/18/4455162.jpg",
        },
        {
            title: "Avatar",
            image: "https://as01.epimg.net/meristation/imagenes/2022/09/30/reportajes/1664534991_626157_1664615989_noticia_normal.jpg",
        },
        {
            title: "Avatar 2",
            image: "https://i.blogs.es/884d13/avatar-2/840_560.jpeg",
        }
    ],
    Anime: [
        {
            title: "Dragonball",
            image: "https://img2.rtve.es/i/?w=1600&i=1657019155649.jpg",
        },
        {
            title: "Dragonball Z",
            image: "https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/36bdc5ea4443cd8e42f22ec7d3884cbb.jpeg",
        },
        {
            title: "Dragonball Super",
            image: "https://depor.com/resizer/6Gmj2BD2B09Yug9skT5G_37oBgg=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/B35WNLM7UJGIJNOWQFDO3UPY34.jpg",
        },
        {
            title: "Naruto Shippuden",
            image: "https://es.web.img3.acsta.net/pictures/13/12/13/09/11/515425.jpg",
        },
        {
            title: "Naruto Next Generation",
            image: "https://img1.ak.crunchyroll.com/i/spire4/7dde3a40ce5d5615813a5ac12683631a1616450115_full.jpg",
        },
        {
            title: "Saint Seiya the Lost Canvas",
            image: "https://larepublica.pe/resizer/e0pacYSNg1Mt_pZBIbVHe65wXHw=/1200x660/top/arc-anglerfish-arc2-prod-gruporepublica.s3.amazonaws.com/public/ATQBEGGFCRDSHAONTOR7O2VCNM.jpg",
        },
        {
            title: "Batalla de Poseidon",
            image: "https://i.ytimg.com/vi/p2POuLSrWms/maxresdefault.jpg",
        },
        {
            title: "Batalla de Asgard",
            image: "https://i.ytimg.com/vi/vsGd6A-CrbY/maxresdefault.jpg",
        },
        {
            title: "Naruto",
            image: "https://i.pinimg.com/originals/3f/0d/1a/3f0d1afe64a74343c0f173faec9df8e0.jpg",
        }
    ]
}

const figuritesToAlbum: any = {
    "Copa Libertadores": [
        {
            image: "https://www.cariverplate.com.ar/imagenes/jugadores/2022-08/1638-01-armani-imagenprincipal.png",
            title: "Armani Franco",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Uni%C3%B3n_Espa%C3%B1ola_-_Curic%C3%B3_Unido%2C_2018-09-30_-_Daniel_Franco_-_02.jpg",
            title: "Franco Daniel",
        },
        {
            image: "https://resizer.glanacion.com/resizer/dRtGyNR9KJ5Zr0BtIjvpdV8J5uU=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CCXOIDZHQRG6PP2JQ2LVCQHOFU.jpg",
            title: "Guido Herrera",
        },
        {
            image: "https://toppng.com/uploads/preview/lucas-pratto-png-river-plate-plantel-2018-11563129429edz4folhq2.png",
            title: "Pratto Lucas",
        },
        {
            image: "https://futhead.cursecdn.com/static/img/21/players_alt/p67333374.png",
            title: "Bou Walter",
        },
        {
            image: "https://www.clubtalleres.com.ar/wp-content/uploads/2021/01/VALOYES-4.png",
            title: "Valoyes Diego",
        },
        {
            image: "https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2022/12/Lionel-Scaloni-El-Planeta-Urbano-1-WEB-copia.jpg?resize=1250%2C698&ssl=1",
            title: "Scaloni",
        }
    ],
    "Champions League": [
        {
            image: "https://futhead.cursecdn.com/static/img/21/players_alt/p67333374.png",
            title: "Bou Walter",
        },
        {
            image: "https://toppng.com/uploads/preview/lucas-pratto-png-river-plate-plantel-2018-11563129429edz4folhq2.png",
            title: "Pratto Lucas",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Uni%C3%B3n_Espa%C3%B1ola_-_Curic%C3%B3_Unido%2C_2018-09-30_-_Daniel_Franco_-_02.jpg",
            title: "Franco Daniel",
        },
        {
            image: "https://www.cariverplate.com.ar/imagenes/jugadores/2022-08/1638-01-armani-imagenprincipal.png",
            title: "ArmanI Franco",
        },
        {
            image: "https://resizer.glanacion.com/resizer/dRtGyNR9KJ5Zr0BtIjvpdV8J5uU=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CCXOIDZHQRG6PP2JQ2LVCQHOFU.jpg",
            title: "Guido Herrera",
        },
        {
            image: "https://media.tycsports.com/files/2020/11/19/154997/pulga-rodriguez.jpg",
            title: "Luis Miguel Rodríguez",
        }
    ],
    "Copa America": [
        {
            image: "https://img2.freepng.es/20180526/vrr/kisspng-roberto-firmino-liverpool-f-c-football-player-ren-roberto-firmino-5b097993b70f13.2394382015273476037498.jpg",
            title: "Firmiño",
        },
        {
            image: "https://s.hs-data.com/bilder/spieler/gross/445514.jpg?fallback=png",
            title: "Alvarez Julian",
        },
        {
            image: "https://i.bundesliga.com/player/dfl-obj-002g8i-dfl-clu-000007-dfl-sea-0001k6.png",
            title: "Erling Haaland",
        },
        {
            image: "https://i.pinimg.com/736x/0c/f6/9d/0cf69df73b50d137e2815387e9513aee.jpg",
            title: "Cuti Romero",
        },
        {
            image: "https://1vs1-7f65.kxcdn.com/img/players/original/big/png/damian-emiliano-martinez-romero_16482_71-ub-800.png",
            title: "Dibu Martinez",
        }
    ],
    "Wimbledon": [
        {
            image: "https://www.atptour.com/-/media/tennis/players/head-shot/2022/05/25/15/47/nadal-head-2022-may.png",
            title: "Nadal Rafael",
        },
        {
            image: "https://www.mdzol.com/u/fotografias/m/2022/9/15/f608x342-1282478_1312201_10.jpg",
            title: "Federer Roger",
        },
        {
            image: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1313x574:1315x572)/origin-imgresizer.eurosport.com/2021/06/28/3163279-64821308-2560-1440.jpg",
            title: "Andy Murray",
        },
        {
            image: "https://www.atptour.com/-/media/tennis/players/head-shot/2019/05/13/18/27/delpotro_head_rome19.png",
            title: "Juan Martin Del Potro",
        }
    ],
    "Rollan Garros": [
        {
            image: "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iproup.com/assets/jpg/2021/11/23871.jpg",
            title: "David Nalbandian",
        },
        {
            image: "https://www.atptour.com/-/media/tennis/players/head-shot/2019/02/25/18/18/djokovic_head_ao19.png",
            title: "Novak Djovich",
        },
        {
            image: "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/18/21/10/tsitsipas-full-2022-may.png",
            title: "Stefanos Tsitsipas",
        },
        {
            image: "https://www.atptour.com/-/media/alias/player-headshot/MM58",
            title: "Danil Medvedev",
        },
        {
            image: "https://www.atptour.com/-/media/alias/player-headshot/Z355",
            title: "Alexander Zverev",
        },
        {
            image: "https://www.atptour.com/-/media/tennis/players/gladiator/2022/06/18/22/21/fognini-full-2022-june-1.png",
            title: "Fabio Fognini",
        },
        {
            image: "https://www.atptour.com/-/media/images/news/2022/10/01/11/07/ruud-tokyo-2022-draw.jpg",
            title: "Casper Ruud",
        },
        {
            image: "https://www.atptour.com/-/media/tennis/players/gladiator/2022/06/18/23/00/fritz-full-2022-june-1.png",
            title: "Taylor Fritz",
        }
    ],
    "Us Open": [
        {
            image: "https://www.atptour.com/-/media/tennis/players/gladiator/2022/06/16/03/16/tiafoe-full-2022-june.png",
            title: "Frances Tiafoe",
        },
        {
            image: "https://fotos.perfil.com/2022/01/31/trim/720/410/schwartzman-1306189.jpg",
            title: "Diego Schwartzman",
        },
        {
            image: "https://www.atptour.com/-/media/alias/player-headshot/BK40",
            title: "Matteo Berretini",
        },
        {
            image: "https://www.atptour.com/-/media/tennis/players/gladiator/2022/05/25/15/17/baez-full-2022-may.png",
            title: "Sebastian Baez",
        },
        {
            image: "https://www.atptour.com/-/media/tennis/players/head-shot/2022/05/25/15/45/auger-aliassime-head-2022-may.png",
            title: "Felix Auger-Aliassime",
        },
        {
            image: "https://www.atptour.com/es/players/john-isner/i186/www.atptour.com/-/media/tennis/players/head-shot/2022/05/25/15/38/isner-head-2022-may.png",
            title: "John Isner",
        }
    ],
    "Liga Endesa": [
        {
            image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/272.png",
            title: "Manuel Ginobilli",
        },
        {
            image: "https://www.pngmart.com/files/16/Kevin-Durant-PNG-Clipart.png",
            title: "Kevin Durant",
        },
        {
            image: "https://cdn.nba.com/headshots/nba/latest/1040x760/76979.png",
            title: "Elvin Hayes",
        },
        {
            image: "https://i.pinimg.com/originals/6a/78/91/6a789135b8ed3755d3258a88d85851a6.png",
            title: "Bob Pettit",
        }
    ],
    "NBA": [
        {
            image: "https://www.pngplay.com/wp-content/uploads/13/Giannis-Antetokounmpo-Transparent-PNG.png",
            title: "Giannis Antokoumpo",
        },
        {
            image: "https://e7.pngegg.com/pngimages/95/141/png-clipart-russell-westbrook-oklahoma-city-thunder-nba-houston-rockets-kolmikduubel-nba-tshirt-jersey-thumbnail.png",
            title: "Oscar Robertson",
        },
        {
            image: "https://www.laliganacional.com.ar/fotosjugadores/143078.png",
            title: "Martin Cabrera",
        },
        {
            image: "https://i.pinimg.com/originals/6a/78/91/6a789135b8ed3755d3258a88d85851a6.png",
            title: "Bob Pettit",
        },
        {
            image: "https://i0.wp.com/basquettotal.com/wp-content/uploads/2022/02/RC_L2664-e1645034434512.jpg?resize=627%2C376&ssl=1",
            title: "Fernando Martinez",
        }
    ],
    "La Liga Argentina": [
        {
            image: "https://i0.wp.com/pbs.twimg.com/media/Ee47M9zWoAETxa9.png?resize=450%2C450&ssl=1&crop=1",
            title: "Juan Cruz Oberto",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Milanesio_argentina_1992.jpg/200px-Milanesio_argentina_1992.jpg",
            title: "Marcelo Milanesio",
        }
    ],
    "National Rugby League": [
        {
            image: "https://i0.wp.com/pbs.twimg.com/media/Ee47M9zWoAETxa9.png?resize=450%2C450&ssl=1&crop=1",
            title: "Julian Montoya",
        },
        {
            image: "https://www.lavoz.com.ar/resizer/9fLRQKRS9-FVN2RZHhyjb4l_thI=/1024x683/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/RL7CQYI2W5CPNNXEXDSOIRPCII.jpg",
            title: "Matias Alemano",
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVBi6OujLCFBCmpgMvMZQE6f9zLelwg1mEYPZs_Rt2tl0xszSijQdHiwhK4YtvWWlv08Q&usqp=CAU",
            title: "Julian Cruz Mallia",
        },
        {
            image: "https://deporfe.com/wp-content/uploads/2022/05/cubelli.jpg",
            title: "Tomas Cubeli",
        },
        {
            image: "https://sites.google.com/site/vidapuma/_/rsrc/1318771820838/jugadores/felipe-contepomi/J-12-Contepomi_%20Felipe.jpg",
            title: "Felipe Contemponi",
        },
        {
            image: "https://a.espncdn.com/photo/2021/0528/r860181_2_1024x576_16-9.jpg",
            title: "Julian Montoya",
        },
        {
            image: "https://cordobaxv.com.ar/wp-content/uploads/2020/07/2BZUZGQLGBHSPCRYIDF7POGUWY.jpg",
            title: "Beauden Barrett",
        },
        {
            image: "https://www.allblacks.com/assets/Uploads/SW-copy__FocusFillWyIwLjAwIiwiMC4wMCIsMzUwLDQ2MF0.png",
            title: "Sam Whitelock",
        },
        {
            image: "https://cordobaxv.com.ar/wp-content/uploads/2021/12/Sam-Cane-contratro-allblacks-2025.jpg",
            title: "San Cane",
        }
    ],
    "Super League": [
        {
            image: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2015/10/30/14462260859727.jpg",
            title: "David Pocock",
        },
        {
            image: "https://a.espncdn.com/photo/2022/0805/r1044928_1296x729_16-9.jpg",
            title: "Michael Hooper",
        },
        {
            image: "https://d3gbf3ykm8gp5c.cloudfront.net/content/uploads/2022/02/18081522/Jake-Gordon-Waratahs-Super-Rugby-TT-2021-PA.jpg",
            title: "Jake Gordon",
        },
        {
            image: "https://s.libertaddigital.com/fotos/noticias/sebastien-chabal-050514.jpg",
            title: "Sebastian Chabal",
        },
        {
            image: "https://www.lequipe.fr/_medias/img-photo-jpg/atonio-a-ete-condamne-a-six-mois-de-prison-avec-sursis-r-perrocheau-l-equipe/1500000001048599/168:174,1656:1166-828-552-75/c1350.jpg",
            title: "Uini Atonio",
        }
    ],
    "The Rugby Championship": [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFcdujAoFWYVHreXcZehSiNpkZ8qyDb9BSg&usqp=CAU",
            title: "Atsushi Sakate",
        },
        {
            image: "https://www.ultimaterugby.com/images/entities/231381-a666c147e2-11/KenkiFukuokarugbyplayer.jpg",
            title: "Kenki Fukuoka",
        },
        {
            image: "https://d3gbf3ykm8gp5c.cloudfront.net/content/uploads/2019/10/05130704/Yu-Tamura-Japan-RWC-2019-PA.jpg",
            title: "Yu Tamura",
        },
        {
            image: "https://d3gbf3ykm8gp5c.cloudfront.net/content/uploads/2020/07/15094835/Johnny-Williams-Newcastle-Falcons-training-2020-PA.jpg",
            title: "Johnny Williams",
        },
        {
            image: "https://d3gbf3ykm8gp5c.cloudfront.net/content/uploads/2021/10/26123449/Wales-centre-Jonathan-Davies-looking-back-PA-1024x630.jpg",
            title: "Jonathan Davies",
        },
        {
            image: "https://d3gbf3ykm8gp5c.cloudfront.net/content/uploads/2020/09/17162439/Dan-Biggar-for-Wales-v-England-PA.jpg",
            title: "Dan Biggar",
        },
        {
            image: "https://i.ytimg.com/vi/O6IPRouzvU0/hqdefault.jpg",
            title: "Joaquin Prada Centro",
        }
    ],
    "Monster Inc": [
        {
            image: "https://i.pinimg.com/originals/c4/4a/d3/c44ad3182299b9c08337465bef2ea2bc.png",
            title: "Boo",
        },
        {
            image: "https://i.pinimg.com/originals/45/87/71/4587717835c6e0bbb388844a395bd04e.png",
            title: "Mike Wazowski",
        },
        {
            image: "https://e7.pngegg.com/pngimages/178/635/png-clipart-disney-monster-inc-fungus-fungus-at-the-movies-cartoons-thumbnail.png",
            title: "Fungus",
        },
        {
            image: "https://static.wikia.nocookie.net/heroes-of-the-characters/images/e/e5/Roz_%28Monsters_Inc._-_Render%29.png/revision/latest?cb=20210825084538",
            title: "Roz",
        },
        {
            image: "https://static.wikia.nocookie.net/monstersincmovies/images/6/67/Bile-white.jpg/revision/latest?cb=20130515201629",
            title: "Bile",
        }
    ],
    "Monster University": [
        {
            image: "https://i.pinimg.com/originals/c4/4a/d3/c44ad3182299b9c08337465bef2ea2bc.png",
            title: "Boo",
        },
        {
            image: "https://i.pinimg.com/originals/45/87/71/4587717835c6e0bbb388844a395bd04e.png",
            title: "Mike Wazowski",
        },
        {
            image: "https://e7.pngegg.com/pngimages/178/635/png-clipart-disney-monster-inc-fungus-fungus-at-the-movies-cartoons-thumbnail.png",
            title: "Fungus",
        },
        {
            image: "https://static.wikia.nocookie.net/heroes-of-the-characters/images/e/e5/Roz_%28Monsters_Inc._-_Render%29.png/revision/latest?cb=20210825084538",
            title: "Roz",
        },
        {
            image: "https://static.wikia.nocookie.net/monstersincmovies/images/6/67/Bile-white.jpg/revision/latest?cb=20130515201629",
            title: "Bile",
        },
        {
            image: "https://fotografias.antena3.com/clipping/cmsimages01/2018/10/18/226A74E0-C67D-40BA-BD22-9EE8E9909F51/69.jpg?crop=1:1,smart&width=1200&height=1200&optimize=low&format=webply",
            title: "Troy Bolton",
        }
    ],
    "High school Musical": [
        {
            image: "https://i.pinimg.com/originals/df/62/35/df623531f1ee71776396f506916d4095.png",
            title: "Gabriela Montes",
        },
        {
            image: "https://i.pinimg.com/474x/77/05/bf/7705bf1970756bac22a304cf33abca34--ashley-tisdale-drama-queens.jpg",
            title: "Sharpay Evans",
        },
        {
            image: "http://images.girlslife.com/posts/004/4184/prettyleadphoto.jpg",
            title: "Martha Cox",
        },
        {
            image: "https://static.wikia.nocookie.net/my-high-school-musical/images/2/21/406630.jpg/revision/latest?cb=20180729024606",
            title: "Lucille Bolton",
        },
        {
            image: "https://fotografias.antena3.com/clipping/cmsimages01/2018/10/18/226A74E0-C67D-40BA-BD22-9EE8E9909F51/69.jpg?crop=1:1,smart&width=1200&height=1200&optimize=low&format=webply",
            title: "Troy Bolton",
        },
        {
            image: "https://i.pinimg.com/originals/df/62/35/df623531f1ee71776396f506916d4095.png",
            title: "Gabriela Montes",
        },
        {
            image: "http://images.girlslife.com/posts/004/4184/prettyleadphoto.jpg",
            title: "Martha Cox",
        }
    ],
    "High school Musical 2": [
        {
            image: "https://static.wikia.nocookie.net/my-high-school-musical/images/2/21/406630.jpg/revision/latest?cb=20180729024606",
            title: "Lucile Bolton",
        },
        {
            image: "https://fotografias.antena3.com/clipping/cmsimages01/2018/10/18/226A74E0-C67D-40BA-BD22-9EE8E9909F51/69.jpg?crop=1:1,smart&width=1200&height=1200&optimize=low&format=webply",
            title: "Troy Bolton",
        },
        {
            image: "https://i.pinimg.com/originals/df/62/35/df623531f1ee71776396f506916d4095.png",
            title: "Gabriela Montes",
        },
        {
            image: "https://i.pinimg.com/474x/77/05/bf/7705bf1970756bac22a304cf33abca34--ashley-tisdale-drama-queens.jpg",
            title: "Sharpay Evans",
        },
        {
            image: "http://images.girlslife.com/posts/004/4184/prettyleadphoto.jpg",
            title: "Martha Cox",
        },
        {
            image: "https://static.wikia.nocookie.net/my-high-school-musical/images/2/21/406630.jpg/revision/latest?cb=20180729024606",
            title: "Lucile Bolton",
        },
        {
            image: "https://i.pinimg.com/474x/77/05/bf/7705bf1970756bac22a304cf33abca34--ashley-tisdale-drama-queens.jpg",
            title: "Sharpay Evans",
        }
    ],
    "La era del hielo 1": [
        {
            image: "https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free.png",
            title: "Sid",
        },
        {
            image: "https://www.kindpng.com/picc/m/236-2361642_mammoth-manny-la-era-de-hielo-hd-png.png",
            title: "Many",
        },
        {
            image: "https://static.wikia.nocookie.net/iceage/images/a/a7/Bodoque.jpg/revision/latest?cb=20120607153944&path-prefix=es",
            title: "Roshan",
        },
        {
            image: "https://www.pngkey.com/png/detail/318-3182891_download-diego-la-era-de-hielo.png",
            title: "Diego",
        },
        {
            image: "https://w7.pngwing.com/pngs/84/894/png-transparent-ice-age-scrat-scrat-sid-manfred-ellie-ice-age-ice-age-mammal-heroes-fauna-thumbnail.png",
            title: "Scrat",
        }
    ],
    "La era del hielo 2": [
        {
            image: "https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free.png",
            title: "Sid",
        },
        {
            image: "https://www.kindpng.com/picc/m/236-2361642_mammoth-manny-la-era-de-hielo-hd-png.png",
            title: "Many",
        },
        {
            image: "https://static.wikia.nocookie.net/iceage/images/a/a7/Bodoque.jpg/revision/latest?cb=20120607153944&path-prefix=es",
            title: "Roshan",
        },
        {
            image: "https://www.pngkey.com/png/detail/318-3182891_download-diego-la-era-de-hielo.png",
            title: "Diego",
        },
        {
            image: "https://w7.pngwing.com/pngs/84/894/png-transparent-ice-age-scrat-scrat-sid-manfred-ellie-ice-age-ice-age-mammal-heroes-fauna-thumbnail.png",
            title: "Scrat",
        }
    ],
    "La era del hielo 3": [
        {
            image: "https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free.png",
            title: "Sid",
        },
        {
            image: "https://www.kindpng.com/picc/m/236-2361642_mammoth-manny-la-era-de-hielo-hd-png.png",
            title: "Many",
        },
        {
            image: "https://static.wikia.nocookie.net/iceage/images/a/a7/Bodoque.jpg/revision/latest?cb=20120607153944&path-prefix=es",
            title: "Roshan",
        },
        {
            image: "https://www.pngkey.com/png/detail/318-3182891_download-diego-la-era-de-hielo.png",
            title: "Diego",
        },
        {
            image: "https://w7.pngwing.com/pngs/84/894/png-transparent-ice-age-scrat-scrat-sid-manfred-ellie-ice-age-ice-age-mammal-heroes-fauna-thumbnail.png",
            title: "Scrat",
        }
    ],
    "Avatar": [
        {
            image: "https://static.wikia.nocookie.net/james-camerons-avatar/images/1/17/Grace.png/revision/latest?cb=20210408152516&path-prefix=es",
            title: "Dra Grace",
        },
        {
            image: "https://i.pinimg.com/736x/b2/fd/5a/b2fd5a5b1aa105021bba52b2b4ee2394.jpg",
            title: "Neyriti",
        },
        {
            image: "https://www.writeups.org/wp-content/uploads/Jake-Sully-Avatar-movie-Sam-Worthington.jpg",
            title: "Jake Sully",
        },
        {
            image: "https://static.wikia.nocookie.net/james-camerons-avatar/images/8/82/Tsu%27tey_te_Rongloa_Ateyo%27itan.png/revision/latest?cb=20210122023316&path-prefix=es",
            title: "Tsutey",
        },
        {
            image: "https://static.wikia.nocookie.net/james-camerons-avatar/images/2/21/Quaritch.png/revision/latest?cb=20210527234304&path-prefix=es",
            title: "Coronel Milles",
        }
    ],
    "Avatar 2": [
        {
            image: "https://static.wikia.nocookie.net/james-camerons-avatar/images/1/17/Grace.png/revision/latest?cb=20210408152516&path-prefix=es",
            title: "Dra Grace",
        },
        {
            image: "https://i.pinimg.com/736x/b2/fd/5a/b2fd5a5b1aa105021bba52b2b4ee2394.jpg",
            title: "Neyriti",
        },
        {
            image: "https://www.writeups.org/wp-content/uploads/Jake-Sully-Avatar-movie-Sam-Worthington.jpg",
            title: "Jake Sully",
        },
        {
            image: "https://static.wikia.nocookie.net/james-camerons-avatar/images/8/82/Tsu%27tey_te_Rongloa_Ateyo%27itan.png/revision/latest?cb=20210122023316&path-prefix=es",
            title: "Tsutey",
        },
        {
            image: "https://static.wikia.nocookie.net/james-camerons-avatar/images/2/21/Quaritch.png/revision/latest?cb=20210527234304&path-prefix=es",
            title: "Coronel Milles",
        }
    ],
    "Dragonball": [
        {
            image: "https://tierragamer.com/wp-content/uploads/2019/06/Dragon-Ball-Pequeno-Goku.jpg",
            title: "Goku",
        },
        {
            image: "https://i.pinimg.com/originals/01/1f/32/011f32363d97557ee7eaa383a07c2f5a.jpg",
            title: "Krilin",
        },
        {
            image: "https://www.geekmi.news/__export/1654699584752/sites/debate/img/2022/06/08/taopaipai.jpg_1339198940.jpg",
            title: "Tao Pai Pai",
        },
        {
            image: "https://mir-s3-cdn-cf.behance.net/projects/404/11c0cc103711653.5f52b4b6a6dbd.png",
            title: "Picolo",
        },
        {
            image: "https://pm1.narvii.com/6988/9052161534eeeec16bb57b2c7ab7441e25ce4dc5r1-720-404v2_hq.jpg",
            title: "General Blue",
        }
    ],
    "Dragonball Z": [
        {
            image: "https://www.fayerwayer.com/resizer/UAeNc2JHJP1xypVHNAVrMPqxEz4=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/VBRF4I3YM5G63AU637TTONVARE.jpg",
            title: "Vegeta",
        },
        {
            image: "https://www.latercera.com/resizer/dFjofjUYrC3BacG8B3PGUYcgRnc=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/WVF74GVKZZAI5KZQQRW6OZ6QGI.jpg",
            title: "Cell",
        },
        {
            image: "https://i.pinimg.com/originals/26/d0/8b/26d08be0ab87326fc6ad26cc9bdb2ddf.png",
            title: "Majin Boo",
        },
        {
            image: "https://i.pinimg.com/originals/4e/3e/b5/4e3eb5933953657a4d1ea95cee39f366.png",
            title: "Darbura",
        },
        {
            image: "https://e.rpp-noticias.io/xlarge/2019/10/09/015501_849974.jpg",
            title: "Gohan",
        }
    ],
    "Dragonball Super": [
        {
            image: "http://pm1.narvii.com/6542/f434e2fb6efb78b182057696bbfef9760016dc5a_00.jpg",
            title: "Bills",
        },
        {
            image: "https://depor.com/resizer/0FTdOejzzLcQZgm2s-GDC87wDU8=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/WDXFCIRCYNCHDCZ7F3FPT7K5V4.jpg",
            title: "Wiss",
        },
        {
            image: "https://gcdn.lanetaneta.com/wp-content/uploads/2022/03/La-historia-de-fondo-de-Dragon-Ball-Super-de-Jiren-780x470.jpg",
            title: "Jiren",
        },
        {
            image: "https://depor.com/resizer/hY70NAtbG9xSjZW65ZDRrs7X_tU=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/XYRVWY753VGBZJA6FFXIAJBHF4.jpg",
            title: "Topo",
        },
        {
            image: "https://media.vandal.net/i/1440x1080/49072/dragon-ball-fighterz-2018927193257_3.jpg",
            title: "Androide 17",
        }
    ],
    "Naruto Shippuden": [
        {
            image: "https://indiehoy.com/wp-content/uploads/2018/11/naruto.jpg",
            title: "Jiraiya",
        },
        {
            image: "https://www.looper.com/img/gallery/untold-truth-of-obito-uchiha/l-intro-1663609851.jpg",
            title: "Obito Uchiha",
        },
        {
            image: "http://pm1.narvii.com/6807/cc8cd27924f9b644bf1a449ea5094c7869fbf60bv2_00.jpg",
            title: "Hinata Hyūga",
        },
        {
            image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/07/shikamaru-serious-face.jpg",
            title: "Shikamaru Nara",
        },
        {
            image: "https://pm1.narvii.com/6292/86499d2e3fd4b37f9c14709d4f899be025072251_hq.jpg",
            title: "Sasori",
        }
    ],
    "Naruto Next Generation": [
        {
            image: "http://pm1.narvii.com/6903/05259702594930914773e2c9bad84e3897de1d0er1-720-496v2_00.jpg",
            title: "Boruto Uzumaki",
        },
        {
            image: "https://i.ytimg.com/vi/lCNj1tOMeSg/maxresdefault.jpg",
            title: "Sarada Uchiha",
        },
        {
            image: "http://pm1.narvii.com/6587/d7cd0f0324e819bcfb72eb49151eb11cc5f774da_00.jpg",
            title: "Mitsuki",
        },
        {
            image: "https://e7.pngegg.com/pngimages/858/176/png-clipart-inojin-yamanaka-ino-yamanaka-naruto-sarada-uchiha-sai-naruto-fictional-character-cartoon.png",
            title: "Inojin Yamanaka",
        },
        {
            image: "https://animeargentina.net/wp-content/uploads/2022/09/shikadai-nara-boruto-1024x567.jpg",
            title: "Shikadai Nara",
        }
    ],
    "Saint Seiya the Lost Canvas": [
        {
            image: "https://w0.peakpx.com/wallpaper/188/670/HD-wallpaper-seiya-pegaso-seiya-thumbnail.jpg",
            title: "Seiya de Pegaso",
        },
        {
            image: "https://i.ytimg.com/vi/ERU1RT0p4XI/maxresdefault.jpg",
            title: "Seiya de Geminis",
        },
        {
            image: "https://4.bp.blogspot.com/-Y8dZy1ueVNE/UkH7jm2pQ0I/AAAAAAAAECo/nGb9T-6d39Q/w1200-h630-p-k-no-nu/Athena-Saori+47.JPG",
            title: "Atenea",
        },
        {
            image: "https://i.pinimg.com/originals/31/e9/9e/31e99e59c05f07d0cd4428c9713f4e26.jpg",
            title: "Shaka de Virgo",
        },
        {
            image: "https://i.pinimg.com/736x/01/3a/db/013adb562fba898abe5d2ec869e6e31d.jpg",
            title: "Mu de Aries",
        }
    ],
    "Batalla de Poseidon": [
        {
            image: "http://pm1.narvii.com/6293/87a989c9c38a945509db9d65522169977e3e5e30_00.jpg",
            title: "Shun de Andromeda",
        },
        {
            image: "http://pm1.narvii.com/6712/ec816326096d2fe230f28f0760c5be0802e8399f_00.jpg",
            title: "Shura de Capricornio",
        },
        {
            image: "https://w0.peakpx.com/wallpaper/553/97/HD-wallpaper-dragon-shiryu-dragon-shiryu.jpg",
            title: "Shiryū de Dragón",
        },
        {
            image: "http://pm1.narvii.com/6803/9d7b4a867dec204fa73dea3b81b37053230fdb94v2_00.jpg",
            title: "Camus de Acuario",
        },
        {
            image: "http://pm1.narvii.com/6890/8c48ea5abaaad37c00a1a635b366553d2f33009br1-1280-1335v2_uhq.jpg",
            title: "Shion de Aries",
        }
    ],
    "Batalla de Asgard": [
        {
            image: "http://2.bp.blogspot.com/-du6bFdb47Xg/U-VQAgM3DVI/AAAAAAAAAs0/MvlEAOV6kHU/s1600/Siegfried+de+Dubhe+Alfa.JPG",
            title: "Siegfried de Dubhe Alfa",
        },
        {
            image: "http://pm1.narvii.com/6568/493d72b9815f1c67068f0b145128fbd7abc2ef78_00.jpg",
            title: "Syd de Mizar Zeta",
        },
        {
            image: "https://1.bp.blogspot.com/-EcqwLj7ds_M/TjXC8ySud9I/AAAAAAAAB-Y/7eKlYXKpEuo/s1600/Bud%2Bde%2BAlcor%2B14.JPG",
            title: "Bud de Alcor Zeta",
        },
        {
            image: "http://pm1.narvii.com/6943/0468c2b73ddcf1e183974f4f7ca9c6e5011fc215r1-500-625v2_00.jpg",
            title: "Thor de Phecda Gamma",
        },
        {
            image: "http://1.bp.blogspot.com/-LVDyeco5Ob4/T7SlNpDoxFI/AAAAAAAAAqs/34-fPlEuEGM/s1600/1222475717580_f.jpg",
            title: "Fenrir de Alioth Epsilon",
        },
        {
            image: "http://1.bp.blogspot.com/-bnI3Btv9PZo/T7TI4m7QCDI/AAAAAAAAAro/3ZtVAZG-IoM/s1600/mime0.jpg",
            title: "Mime de Benetnasch Eta",
        },
        {
            image: "http://pm1.narvii.com/6482/f62e6851ea49e05180b1df59281f1c51a37379ef_00.jpg",
            title: "Alberich de Megrez Delta",
        },
        {
            image: "https://2.bp.blogspot.com/-wLMXGMh4VaQ/Tgod1AWZBPI/AAAAAAAABw8/9xDpIpNMWIE/s1600/Hagen%2Bde%2BMerak%2B%2528Beta%2529%2B21.JPG",
            title: "Hagen de Merak Beta",
        },
        {
            image: "https://i.pinimg.com/736x/5b/fa/40/5bfa4054ea0ec72fb6a79486403978cc.jpg",
            title: "Andromeda",
        },
        {
            image: "https://i.pinimg.com/736x/8e/13/39/8e1339160a22b5c26a3e42dd859360b0.jpg",
            title: "Danae",
        }
    ],
    "Naruto": [
        {
            image: "https://i.blogs.es/bc1dd2/naruto/450_1000.png",
            title: "Naruto",
        },
        {
            image: "https://i.pinimg.com/600x315/a6/1f/be/a61fbe0e9d11632d65dd09fa0bead32d.jpg",
            title: "Sasuke",
        },
        {
            image: "https://www.egames.news/__export/1637434465357/sites/debate/img/2021/11/20/itachi-uchiha.jpg_423682103.jpg",
            title: "Itachi",
        },
        {
            image: "https://w7.pngwing.com/pngs/130/591/png-transparent-sakura-haruno-kakashi-hatake-naruto-anime-sakura-fictional-character-cartoon-arm.png",
            title: "Sakura",
        },
        {
            image: "https://www.lifeder.com/wp-content/uploads/2016/12/frases-de-Madara-Uchiha.jpg",
            title: "Madara",
        }
    ]
}