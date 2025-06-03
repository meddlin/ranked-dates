"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DateIdeasList from "@/components/DateIdeasList";
import { useAppStore } from "@/lib/clientStore";
import NotesDisplay from "@/components/NotesDisplay";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Database } from "lucide-react";

import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1");
  const previewedItem = useAppStore((state: any) => state.previewedItem);
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

    //     <h2>Landing Page</h2>
    //   </main>
    // </div>
    <main data-oid="qd9_29j">
      <section className="py-20" data-oid="_n5jprp">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="0zc:s67"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-8" data-oid="snc9n9e">
            <div
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
              data-oid="18od0bk"
            >
              <h1
                className="text-4xl font-bold text-orange-500 tracking-tight sm:text-5xl md:text-6xl"
                data-oid="_4zu1tx"
              >
                Your places. Your way.
              </h1>
              <p
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                data-oid="nn6f5ol"
              >
                Guessing what to do? Never again. That swanky restaurant. The
                chill hangout. The dive bar that isn&apos;t so dive-y. All
                stored in one place.
              </p>
              <div
                className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                data-oid="v84cipf"
              >
                <Link href="/sign-up" data-oid="5i_m93-">
                  <Button
                    className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center"
                    data-oid="5fzhj6d"
                  >
                    Sign Up
                    <ArrowRight className="ml-2 h-5 w-5" data-oid="v9yff6p" />
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
              data-oid="4h_cj3j"
            >
              <div
                className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]"
                data-oid="xmouwuk"
              >
                <div
                  className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"
                  data-oid="6221n0k"
                ></div>
                <div
                  className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"
                  data-oid="04oet4o"
                ></div>
                <div
                  className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"
                  data-oid="6n_nfn2"
                ></div>
                <div
                  className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"
                  data-oid="1bazte9"
                ></div>
                <div
                  className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800"
                  data-oid="jxb-x::"
                >
                  <div
                    className="bg-orange-500 px-4 py-6 text-white"
                    data-oid="f3ka0or"
                  >
                    <div
                      className="flex items-center justify-between mb-4"
                      data-oid="p4xjpzq"
                    >
                      <h1 className="text-xl font-bold" data-oid="y6bsv1l">
                        Ranked Dates
                      </h1>
                      <div
                        className="w-8 h-8 bg-white/20 rounded-full"
                        data-oid="r0ww.oy"
                      ></div>
                    </div>
                    <p className="text-orange-100 text-sm" data-oid="b:ntsr-">
                      Your places. Your way.
                    </p>
                  </div>

                  <div className="p-4 space-y-3" data-oid="zvzx2ov">
                    <div
                      className="bg-gray-50 rounded-lg p-3 border-l-4 border-orange-500"
                      data-oid="n3-e51o"
                    >
                      <div
                        className="flex items-center justify-between"
                        data-oid="o8dc3he"
                      >
                        <div data-oid="m2um-ab">
                          <h3
                            className="font-semibold text-gray-900 text-sm"
                            data-oid="yq.dmdj"
                          >
                            The Rooftop Bar
                          </h3>
                          <p
                            className="text-gray-600 text-xs"
                            data-oid="44o2t14"
                          >
                            Downtown • $$
                          </p>
                        </div>
                        <div
                          className="text-orange-500 font-bold text-lg"
                          data-oid="79jrwrw"
                        >
                          #1
                        </div>
                      </div>
                      <p
                        className="text-gray-500 text-xs mt-1"
                        data-oid="kdbq8iq"
                      >
                        Amazing city views, perfect for special occasions
                      </p>
                    </div>

                    <div
                      className="bg-gray-50 rounded-lg p-3 border-l-4 border-orange-400"
                      data-oid="p:tm5n."
                    >
                      <div
                        className="flex items-center justify-between"
                        data-oid="n:2_zod"
                      >
                        <div data-oid="etr-14e">
                          <h3
                            className="font-semibold text-gray-900 text-sm"
                            data-oid="7yl3voq"
                          >
                            Coffee Corner
                          </h3>
                          <p
                            className="text-gray-600 text-xs"
                            data-oid="m78wfs5"
                          >
                            Midtown • $
                          </p>
                        </div>
                        <div
                          className="text-orange-400 font-bold text-lg"
                          data-oid="k-7fb:8"
                        >
                          #2
                        </div>
                      </div>
                      <p
                        className="text-gray-500 text-xs mt-1"
                        data-oid="bhbxqky"
                      >
                        Great for morning dates, excellent pastries
                      </p>
                    </div>

                    <div
                      className="bg-gray-50 rounded-lg p-3 border-l-4 border-orange-300"
                      data-oid="oomw_45"
                    >
                      <div
                        className="flex items-center justify-between"
                        data-oid=":youujp"
                      >
                        <div data-oid="4tym0x:">
                          <h3
                            className="font-semibold text-gray-900 text-sm"
                            data-oid="jue.jfh"
                          >
                            Park Trail
                          </h3>
                          <p
                            className="text-gray-600 text-xs"
                            data-oid="2uqetlb"
                          >
                            Westside • Free
                          </p>
                        </div>
                        <div
                          className="text-orange-300 font-bold text-lg"
                          data-oid="8eki-.y"
                        >
                          #3
                        </div>
                      </div>
                      <p
                        className="text-gray-500 text-xs mt-1"
                        data-oid="mvzwu4j"
                      >
                        Beautiful hiking trail, bring water bottles
                      </p>
                    </div>

                    <div
                      className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-300"
                      data-oid="sy5f59j"
                    >
                      <div
                        className="flex items-center justify-between"
                        data-oid="6_0-bra"
                      >
                        <div data-oid="bwbpk-6">
                          <h3
                            className="font-semibold text-gray-900 text-sm"
                            data-oid="xma0r5n"
                          >
                            Local Dive
                          </h3>
                          <p
                            className="text-gray-600 text-xs"
                            data-oid="ll8zuwo"
                          >
                            East End • $
                          </p>
                        </div>
                        <div
                          className="text-gray-400 font-bold text-lg"
                          data-oid="w3-t74a"
                        >
                          #4
                        </div>
                      </div>
                      <p
                        className="text-gray-500 text-xs mt-1"
                        data-oid="yn8-l_g"
                      >
                        Casual vibes, great for game nights
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-4 left-4 right-4"
                    data-oid="h7_kal5"
                  >
                    <button
                      className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium"
                      data-oid="a.djna9"
                    >
                      + Add New Place
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full" data-oid="33h91ap">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="hoo:sg3"
        >
          <div className="lg:grid lg:grid-cols-3 lg:gap-8" data-oid="bo7euxb">
            <div data-oid="aewx164">
              <div
                className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white"
                data-oid=".e.rthc"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" data-oid="3t96esp">
                  <path
                    fill="currentColor"
                    d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
                    data-oid="ntr-ztm"
                  />
                </svg>
              </div>
              <div className="mt-5" data-oid="r_0e4ly">
                <h2
                  className="text-lg font-medium text-gray-900"
                  data-oid="::zos2i"
                >
                  Build a list of places
                </h2>
                <p className="mt-2 text-base text-gray-500" data-oid="6inf-k8">
                  That swanky bar? Chill hangout? Build a list of your favorite
                  places around town.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0" data-oid="2c32y-x">
              <div
                className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white"
                data-oid="xlv1ol."
              >
                <Database className="h-6 w-6" data-oid="obi4vo_" />
              </div>
              <div className="mt-5" data-oid="vsvzh.z">
                <h2
                  className="text-lg font-medium text-gray-900"
                  data-oid="tkgbd:8"
                >
                  Make notes about each one
                </h2>
                <p className="mt-2 text-base text-gray-500" data-oid="xemvia:">
                  A specific hiking trail. That special menu hack. Or
                  remembering that special waiter who made dinner so much fun.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0" data-oid="f4wii8u">
              <div
                className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white"
                data-oid="3311v_7"
              >
                <CreditCard className="h-6 w-6" data-oid="kfhdwmb" />
              </div>
              <div className="mt-5" data-oid="r8wgkjw">
                <h2
                  className="text-lg font-medium text-gray-900"
                  data-oid="r13h21:"
                >
                  Ranked
                </h2>
                <p className="mt-2 text-base text-gray-500" data-oid=".h.6.5b">
                  Seamless payment processing and subscription management with
                  industry-leading Stripe integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-oid="z6jwmcv">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="yu2hohc"
        >
          <div
            className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
            data-oid="za-_8td"
          >
            <div data-oid="0bo5165">
              <h2
                className="text-3xl font-bold text-gray-900 sm:text-4xl"
                data-oid="xjjd2fa"
              >
                Already have an account?
              </h2>
              <p
                className="mt-3 max-w-3xl text-lg text-gray-500"
                data-oid="l3.:th-"
              >
                Sign in right here
              </p>
            </div>
            <div
              className="mt-8 lg:mt-0 flex justify-center lg:justify-end"
              data-oid="3xxv_9j"
            >
              <Link href="/sign-in" data-oid="870qdm7">
                <Button
                  className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center"
                  data-oid="-49zyki"
                >
                  Sign In
                  <ArrowRight className="ml-3 h-6 w-6" data-oid="-2vfjl_" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
